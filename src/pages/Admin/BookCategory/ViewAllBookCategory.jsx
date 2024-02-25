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
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { FiDownload } from "react-icons/fi";
import { Breadcrumbs } from "../../../AbstractElements";
import {
  GetAllBookCategories,
  UpdateBookCategory,
} from "../../../api_handler/bookcategory";

const ViewAllBookCategory = () => {
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [tooltipOpen, setTooltipOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);

  const [editableItem, setEditableItem] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [data, setData] = useState([]);
  const [editedData, setEditedData] = useState({
    category: "",
    description: "",
    status: "",
  });
  const [statusDropdownOpen, setStatusDropdownOpen] = useState(false);

  const [loading, setLoading] = useState(true); // New loading state

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await GetAllBookCategories();
        console.log(response)
        setData(response.categories);
        setLoading(false); // Set loading to false once data is fetched
      } catch (error) {
        console.error("Error fetching data:", error);
        // Handle error, show an error message, etc.
        setLoading(false); // Set loading to false in case of an error
      }
    }
    fetchData();
  }, []);

  const toggleStatusDropdown = () => {
    setStatusDropdownOpen(!statusDropdownOpen);
  };
  //   const toggleDropdown = (id) => {
  //     setDropdownOpen(!dropdownOpen);
  //     setSelectedItemId(id);
  //   };

  const toggleEditModal = () => {
    setEditModalOpen(!editModalOpen);
  };
  //for edit button
  const handleEdit = (id) => {
    setEditableItem(id);
    const bookToEdit = data.find((elem) => elem.id === id);
    setEditedData({
      category_name: bookToEdit.category_name,
      category_description: bookToEdit.category_description,
      status: bookToEdit.status,
    });
    toggleEditModal();
  };

  const saveChanges = () => {
    const index = data.findIndex((item) => item.id === editableItem);

    const updatedData = [...data];

    updatedData[index] = {
      ...data[index],
      category_name: editedData.category_name,
      category_description: editedData.category_description,
      status: editedData.status,
    };

    // Set the updated data
    UpdateBookCategory(
      editableItem,
      editedData.category_name,
      editedData.category_description,
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
  //to get edit data
  const handleEditableFormChange = (e) => {
    const { name, value } = e.target;
    setEditedData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  //filter functionality

  //book will disapear
  const changeStatus = (id) => {
    setData((prevData) =>
      prevData.map((item) =>
        item.id === id ? { ...item, status: "inactive", hidden: true } : item
      )
    );
    setDropdownOpen(false);
  };

  //const filteredData = data.filter((item) => !item.hidden);
  const toggleDropdown = (id) => {
    setActiveDropdown(activeDropdown === id ? null : id);
  };
  const columns = [
    {
      name: "S.no",
      selector: (row, index) => index + 1,
      sortable: true,
      maxWidth:"150px"
    },
    {
      name: "Book Category",
      selector: (row) => row.category_name,
      maxWidth:"250px"
    },
    {
      name: "Description",
      selector: (row) => row.category_description,
      maxWidth:"250px"

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
            <DropdownItem onClick={() => changeStatus(row.id)}>
              Inactivate
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      ),
    },
  ];
  const toggleTooltip = () => {
    setTooltipOpen(!tooltipOpen);
  };
  return (
    <Fragment>
      <Breadcrumbs
        parent="Book Management"
        mainTitle="View All Category"
        title="View All Category"
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
            <Input
              className="mx-4"
              type="text"
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{ width: "250px" }} // Adjust the width as needed
            />
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

          {/* Edit Modal */}
          <Modal isOpen={editModalOpen} toggle={toggleEditModal}>
            <ModalHeader toggle={toggleEditModal}>Edit Book</ModalHeader>
            <ModalBody>
              {/* Add your form for editing here */}
              <Form>
                <FormGroup>
                  <Label for="bookCategory">Book Category</Label>
                  <Input
                    type="text"
                    name="category_name"
                    id="bookCategory"
                    placeholder="Enter book category_name"
                    value={editedData.category_name}
                    onChange={handleEditableFormChange}
                  />
                </FormGroup>
                <FormGroup>
                  <Label for="category_description">Description</Label>
                  <Input
                    type="textarea"
                    name="category_description"
                    id="category_description"
                    placeholder="Enter book description"
                    value={editedData.category_description}
                    onChange={handleEditableFormChange}
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
};

export default ViewAllBookCategory;
