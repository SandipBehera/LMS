import React, { Fragment, useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import {
  Button,
  ButtonDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Form,
  FormGroup,
  Label,
  Input,
  Dropdown,
  Tooltip,
  Card,
  Container,
} from "reactstrap";
import { toast } from "react-toastify";
import { Breadcrumbs } from "../../../AbstractElements";
import {
  GetAllBookLocation,
  GetBlock,
  UpdateBookLocation,
} from "../../../api_handler/booklocation";
import { FiDownload } from "react-icons/fi";
import { Link } from "react-router-dom";
import { branchID } from "../../../Constant";


export default function AllBookLocation() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true); // New loading state
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [statusDropdownOpen, setStatusDropdownOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [editableItem, setEditableItem] = useState(null);
  const [editedData, setEditedData] = useState({
    block: "",
    shelf_name: "",
    sub_rack_name: "",
    rack_name: "",
    status: "",
  });
  const [block, setBlock] = useState([]);
  const [tooltipOpen, setTooltipOpen] = useState(false);

  const userType = localStorage.getItem("userType");

  useEffect(() => {
    async function fetchLocations() {
      try {
        const response = await GetAllBookLocation();
        setData(response.location);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    }
    fetchLocations();
  }, []);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await GetBlock();
        setBlock(response.categories);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
    fetchData();
  }, []);

  console.log(block)

  const toggleStatusDropdown = () => {
    setStatusDropdownOpen(!statusDropdownOpen);
  };
  const toggleEditModal = () => {
    setEditModalOpen(!editModalOpen);
  };
  const toggleDropdown = (id) => {
    setActiveDropdown(activeDropdown === id ? null : id);
  };
  const toggleTooltip = () => {
    setTooltipOpen(!tooltipOpen);
  };


  const handleEdit = (id) => {
    setEditableItem(id);
    const bookToEdit = data.find((elem) => elem.id === id);
    setEditedData({
      block: bookToEdit.block,
      shelf_name: bookToEdit.shelf_name,
      rack_name: bookToEdit.rack_name,
      sub_rack_name: bookToEdit.sub_rack_name,
      status: bookToEdit.status,
    });
    toggleEditModal();
  };

  const saveChanges = () => {
    const index = data.findIndex((item) => item.id === editableItem);

    const updatedData = [...data];

    updatedData[index] = {
      ...data[index],
      block: editedData.block,
      shelf_name: editedData.shelf_name,
      rack_name: editedData.rack_name,
      sub_rack_name: editedData.sub_rack_name,
      status: editedData.status,
    };

    // Set the updated data
    UpdateBookLocation(
      editableItem,
      editedData.block,
      editedData.shelf_name,
      editedData.rack_name,
      editedData.sub_rack_name,
      editedData.status
    ).then((response) => {
      if (response.status === "success") {
        setData(updatedData);
        toggleEditModal();
        toast.success("Book Category updated Successfully");
      } else {
        toast.error("Error updating Book Category");
      }
    });
  };

  const columns = [
    {
      name: "S.no",
      selector: (row, index) => index + 1,
      sortable: true,
    },
    {
      name: "Block",
      selector: (row) => row.block,
    },
    {
      name: "Shelf Name",
      selector: (row) => row.shelf_name,
    },
    {
      name: "Rack Name",
      selector: (row) => `${row.rack_name}/${row.sub_rack_name}`,
    },
    {
      name: "Status",
      cell: (row) => (
        <Button
          color={row.status === "active" ? "success" : "secondary"}
          className="px-3"
        >
          {row.status}
        </Button>
      ),
    },
    {
      name: "Action",
      cell: (row) => (
        <Dropdown
          isOpen={activeDropdown === row.id}
          toggle={() => toggleDropdown(row.id)}
        >
          <DropdownToggle caret>Action</DropdownToggle>
          <DropdownMenu>
            <DropdownItem onClick={() => handleEdit(row.id)}>Edit</DropdownItem>
            <DropdownItem onClick={() => handleStatus(row.id)}>
              {row.status === "active" ? "Inactive" : "Active"}
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      ),
    },
  ];

  return (
    <Fragment>
      <Breadcrumbs
        parent="Book Location"
        mainTitle="View All Location"
        title="View All Location"
      />
      <Card>
        <Container>
          
        <div className="d-flex justify-content-end align-items-center m-4">
            <Button color="info" className="mx-4">
              Bulk Upload
            </Button>
            <FiDownload
              id="downloadIcon"
              className="mx-4 text-primary"
              style={{ fontSize: "1.8rem" }}
            />
            <Tooltip
              placement="bottom"
              isOpen={tooltipOpen}
              target="downloadIcon"
              toggle={toggleTooltip}
            >
              Download
            </Tooltip>
            <Link to={`/${userType}/${branchID}/add-book-location`}>
              <Button className="mx-4">Add Book Location</Button>
            </Link>
          </div>

          <DataTable
            columns={columns}
            data={data}
            pagination
            noDataComponent={
              loading ? <div>Loading...</div> : <div>No values found</div>
            }
            responsive={true}
          />

          <Modal isOpen={editModalOpen} toggle={toggleEditModal}>
            <ModalHeader toggle={toggleEditModal}>Edit Book</ModalHeader>
            <ModalBody>
              <Form>
                <FormGroup>
                  <Label for="Block">Block</Label>
                  <Input
                    type="select"
                    name="Block"
                    id="Block"
                    placeholder="Enter block name"
                    value={editedData.block}
                    onChange={(e) =>
                      setEditedData({ ...editedData, block: e.target.value })
                    }
                  >
                    <option>Select block</option>
                    {block.map((b) => (
                      <option key={b.id} value={b.block_name}>
                        {b.block_name}
                      </option>
                    ))}
                  </Input>
                </FormGroup>
                <FormGroup>
                  <Label for="Rackname">Shelf Name</Label>
                  <Input
                    type="text"
                    name="rack_name"
                    id="Rackname"
                    placeholder="Enter shelf name"
                    value={editedData.shelf_name}
                    onChange={(e) =>
                      setEditedData({
                        ...editedData,
                        shelf_name: e.target.value,
                      })
                    }
                  />
                </FormGroup>

                <FormGroup>
                  <Label for="Shelfname">Rack Name</Label>
                  <Input
                    type="text"
                    name="shelf_name"
                    id="Shelfname"
                    placeholder="Enter rack name"
                    value={editedData.rack_name}
                    onChange={(e) =>
                      setEditedData({
                        ...editedData,
                        rack_name: e.target.value,
                      })
                    }
                  />
                </FormGroup>

                <FormGroup>
                  <Label for="Floor">Sub Rack Name</Label>
                  <Input
                    type="text"
                    name="sub_rack_name"
                    id="Floor"
                    placeholder="Enter floor name"
                    value={editedData.sub_rack_name}
                    onChange={(e) =>
                      setEditedData({
                        ...editedData,
                        sub_rack_name: e.target.value,
                      })
                    }
                  />
                </FormGroup>
                <FormGroup>
                  <Label for="status">Status</Label>
                  <Dropdown
                    isOpen={statusDropdownOpen}
                    toggle={toggleStatusDropdown}
                  >
                    <DropdownToggle caret>{editedData.status}</DropdownToggle>
                    <DropdownMenu>
                      <DropdownItem
                        onClick={() =>
                          setEditedData({ ...editedData, status: "active" })
                        }
                      >
                        Active
                      </DropdownItem>
                      <DropdownItem
                        onClick={() =>
                          setEditedData({ ...editedData, status: "inactive" })
                        }
                      >
                        Inactive
                      </DropdownItem>
                    </DropdownMenu>
                  </Dropdown>
                </FormGroup>
              </Form>
            </ModalBody>
            <ModalFooter>
              <Button color="primary" onClick={saveChanges}>
                Save Changes
              </Button>
              <Button color="secondary" onClick={toggleEditModal}>
                Cancel
              </Button>
            </ModalFooter>
          </Modal>
        </Container>
      </Card>
    </Fragment>
  );
}
