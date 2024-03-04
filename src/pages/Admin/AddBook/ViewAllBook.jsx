import React, { Fragment, useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import {
  Button,
  Card,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Container,
  CardBody,
  CardHeader,
  Modal,
  ModalBody,
  ModalHeader,
  Input,
  Label,
  FormGroup,
  ModalFooter,
} from "reactstrap";
import { Breadcrumbs } from "../../../AbstractElements";
import { Link } from "react-router-dom";
import {
  getAllBooks,
 
} from "../../../api_handler/addbookapi";
import "./css/datatable.css";
import { userId } from "../../../Constant";
import { GetAllBookLocation } from "../../../api_handler/booklocation";

const ViewAllBooks = () => {
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [books, setBooks] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [location, setLocation] = useState([]);
  const toggleDropdown = (id) => {
    setActiveDropdown(activeDropdown === id ? null : id);
  };

  const toggleModal = () => {
    setModalOpen(!modalOpen);
  };

  const userType = localStorage.getItem("userType");
  const branchId = localStorage.getItem("branchId");

  //fetch allbook location
  useEffect(() => {
    async function fetchBookLocations() {
      try {
        const response = await GetAllBookLocation();
        console.log("location is", response.location);
        setLocation(response.location);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
    fetchBookLocations();
  }, []);

  useEffect(() => {
    async function fetchBooks() {
      try {
        const booksData = await getAllBooks();
        console.log("all book", booksData.books);
        setBooks(booksData.books);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
    fetchBooks();
  }, []);

  // const saveChanges = () => {
  //   console.log("Changes saved");
  // };

  const toggleCancel = () => {
    toggleModal();
  };

  const columns = [
    {
      name: "S. No",
      selector: (row, index) => index + 1,
      sortable: true,
    },
    {
      name: "Book Title",
      selector: (row) => row.book_name,
    },
    {
      name: "Category",
      selector: (row) => row.book_category,
    },
    {
      name: "Author",
      selector: (row) => row.book_author,
    },
    {
      name: "Publisher",
      selector: (row) => row.book_publisher,
    },
    {
      name: "Edition",
      selector: (row) => row.book_edition,
    },
    {
      name: "Status",
      cell: (row) => (
        <Button
          color={row.status === "active" ? "success" : "danger"}
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
          <DropdownToggle caret color="secondary">
            Action
          </DropdownToggle>
          <DropdownMenu
            style={{
              position: "absolute",
              top: "100%",
              left: 0,
              maxHeight: "200px",
              overflowY: "auto",
            }}
          >
            <DropdownItem>
              <Link
                to={`/${userType}/${userId}/add-inventory`}
                state={{ bookDetails: row }}
              >
                Book Inventory
              </Link>
            </DropdownItem>
            <DropdownItem>
              <Link to={`/${userType}/${userId}/copy-list`}>Copies List</Link>
            </DropdownItem>
            <DropdownItem onClick={toggleModal}>Book Place</DropdownItem>
            <DropdownItem>
              <Link to={`/${userType}/${userId}/add-damage`}>Add Damages</Link>
            </DropdownItem>
            <DropdownItem>
              <Link
                to={`/${userType}/${userId}/edit-book`}
                state={{ bookDetails: row }}
              >
                Edit
              </Link>
            </DropdownItem>
            <DropdownItem>
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
        parent="Add Book"
        mainTitle="All Books"
        title="View All Books"
      />

      <Container>
        <Card>
          <CardHeader>
            <Link
              to={`/${userType}/${branchId}/add-book`}
              className="d-flex justify-content-end align-item-end"
            >
              <Button color="primary">Add Book</Button>
            </Link>
          </CardHeader>
          <CardBody>
            <DataTable
              columns={columns}
              data={books}
              pagination
              style={{ height: "400px !important" }}
              overflowY
              theme="solarized"
              className="custom-datatable"
            />
          </CardBody>
        </Card>
      </Container>

      <Modal isOpen={modalOpen} toggle={toggleModal}>
        <ModalHeader toggle={toggleModal}>Book Place</ModalHeader>
        <ModalBody>
          {location.map((block, index) => (
            <div key={index}>
              <FormGroup>
                <Label
                  for={`blockName_${index}`}
                  className="font-size font-weight-bold"
                  style={{ fontWeight: "bold" }}
                >
                  Block Name
                </Label>
                <Input type="select" id={`blockName_${index}`}>
                  <option value={block.block}>{block.block}</option>
                </Input>
              </FormGroup>
              <FormGroup>
                <Label
                  for={`shelfName_${index}`}
                  className="font-size font-weight-bold"
                  style={{ fontWeight: "bold" }}
                >
                  Shelf Name
                </Label>
                <Input type="select" id={`shelfName_${index}`}>
                  <option value={block.shelf_name}>{block.shelf_name}</option>
                </Input>
              </FormGroup>
              <FormGroup>
                <Label
                  for={`rackName_${index}`}
                  className="font-size font-weight-bold"
                  style={{ fontWeight: "bold" }}
                >
                  Rack Name
                </Label>
                <Input type="select" id={`rackName_${index}`}>
                  <option value={block.rack_name}>{block.rack_name}</option>
                </Input>
              </FormGroup>
            
              <FormGroup>
                <Label
                  for={`subRackName_${index}`}
                  className="font-size font-weight-bold"
                  style={{ fontWeight: "bold" }}
                >
                  SubRack Name
                </Label>
                <Input type="select" id={`subRackName_${index}`}>
                  <option value={block.sub_rack_name}>
                    {block.sub_rack_name}
                  </option>
                </Input>
              </FormGroup>
              <FormGroup>
                <Label
                  for={`status_${index}`}
                  className="font-size font-weight-bold"
                  style={{ fontWeight: "bold" }}
                >
                  Status
                </Label>
                <Input type="select" id={`status_${index}`}>
                  <option value={block.status}>
                    {block.status}
                  </option>
                </Input>
              </FormGroup>
            </div>
          ))}
        </ModalBody>
        <ModalFooter>
          {/* <Button color="primary" onClick={saveChanges}>
            Save Changes
          </Button> */}
          <Button color="secondary" onClick={toggleCancel}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    </Fragment>
  );
};

export default ViewAllBooks;
