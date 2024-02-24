import React, { Fragment, useEffect, useState } from 'react';

import DataTable from 'react-data-table-component';
import { Button, Dropdown, DropdownItem, DropdownMenu, DropdownToggle, Form, FormGroup, Input, Label, Modal, ModalHeader, ModalBody, ModalFooter, Tooltip } from 'reactstrap';
import { FiDownload } from "react-icons/fi";
import { Breadcrumbs } from '../../../AbstractElements';
import {Link} from "react-router-dom"
import { GetAllBookLocation } from '../../../api_handler/booklocation';
 
const AllBookLocation = () => {
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [editableItemId, setEditableItemId] = useState(null);
  const [tooltipOpen, setTooltipOpen] = useState(false);
  const [editedData, setEditedData] = useState({
    Block: "",
    Floor: "",
    Shelfname: "",
    Rackname: "",
    status: "",
  });
  const userType=localStorage.getItem("userType");
  const branchId= localStorage.getItem("branchId");
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true); // New loading state

useEffect(() => {
  async function fetchData() {
    try {
      const response = await GetAllBookLocation(); // Call GetAllBookLocation function
      console.log("Location",response);
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

 
  const columns = [
    {
      name: "S.no",
      selector: (row, index) => index + 1,
      sortable: true,
    },
    {
      name: "Block",
      selector: (row) => row.Block,
    },
    {
      name: "Floor",
      selector: (row) => row.Floor,
    },
    {
      name: "Shelfname",
      selector: (row) => row.Shelfname,
    },
    {
      name: "Rackname",
      selector: (row) => row.Rackname,
    },
    {
      name: "Status",
      cell: (row) => (
        <Button color={row.status === "Active" ? "success" : "secondary"} className='px-3'>
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
            <DropdownItem onClick={() => changeStatus(row.id)}>Inactivate</DropdownItem>
          </DropdownMenu>
        </Dropdown>
      ),
    },
  ];
 
  const handleEdit = (id) => {
    setEditableItemId(id);
    const bookToEdit = data.find((elem) => elem.id === id);
    setEditedData({
      Block: bookToEdit.Block,
      Floor: bookToEdit.Floor,
      Shelfname: bookToEdit.Shelfname,
      Rackname: bookToEdit.Rackname,
      status: bookToEdit.status,
    });
    setEditModalOpen(true);
  };
 
  const changeStatus = (id) => {
    const updatedData = data.map((item) =>
      item.id === id
        ? { ...item, hidden: true }
        : item
    );
    setData(updatedData);
  };
 
  const toggleDropdown = (id) => {
    setActiveDropdown(activeDropdown === id ? null : id);
  };
 
  const toggleEditModal = () => {
    setEditModalOpen(!editModalOpen);
  };
 
  const saveChanges = () => {
    const updatedData = data.map((item) =>
      item.id === editableItemId
        ? { ...item, ...editedData }
        : item
    );
    setData(updatedData);
    setEditModalOpen(false);
  };
 
 
  const toggleTooltip = () => {
    setTooltipOpen(!tooltipOpen);
  };
 
  return (
    <Fragment>
      <Breadcrumbs
        parent="Book Location"
        mainTitle="View All Book Location"
        
        title="View All Book Location"
      />
 
 <div className="d-flex justify-content-end align-items-center m-4">
          <Button color="info" className='mx-4'>
            Bulk Upload
          </Button>
          <FiDownload  id="downloadIcon"  className="mx-4 text-primary" style={{fontSize:"1.8rem"}} />
          <Tooltip
        placement="bottom"
        isOpen={tooltipOpen}
        target="downloadIcon"
        toggle={toggleTooltip}
      >
        Download
      </Tooltip>
      <Link to={`/${userType}/${branchId}/add-book-location`}>
      <Button className='mx-4'>
       Add Book Location
      </Button>
      </Link>
      
     
</div>
      <DataTable columns={columns} data={data} pagination />
 
      {/* Edit Modal */}
      <Modal isOpen={editModalOpen} toggle={toggleEditModal}>
        <ModalHeader toggle={toggleEditModal}>Edit Book</ModalHeader>
        <ModalBody>
          <Form>
            <FormGroup>
              <Label for="Block">Block</Label>
              <Input
                type="text"
                name="Block"
                id="Block"
                placeholder="Enter block name"
                value={editedData.Block}
                onChange={(e) =>
                  setEditedData({ ...editedData, Block: e.target.value })
                }
              />
            </FormGroup>
            <FormGroup>
              <Label for="Floor">Floor</Label>
              <Input
                type="text"
                name="Floor"
                id="Floor"
                placeholder="Enter floor name"
                value={editedData.Floor}
                onChange={(e) =>
                  setEditedData({ ...editedData, Floor: e.target.value })
                }
              />
            </FormGroup>
            <FormGroup>
              <Label for="Shelfname">Shelfname</Label>
              <Input
                type="text"
                name="Shelfname"
                id="Shelfname"
                placeholder="Enter shelf name"
                value={editedData.Shelfname}
                onChange={(e) =>
                  setEditedData({ ...editedData, Shelfname: e.target.value })
                }
              />
            </FormGroup>
            <FormGroup>
              <Label for="Rackname">Rack Name</Label>
              <Input
                type="text"
                name="Rackname"
                id="Rackname"
                placeholder="Enter rack name"
                value={editedData.Rackname}
                onChange={(e) =>
                  setEditedData({ ...editedData, Rackname: e.target.value })
                }
              />
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
    </Fragment>
  );
};
 
export default AllBookLocation;