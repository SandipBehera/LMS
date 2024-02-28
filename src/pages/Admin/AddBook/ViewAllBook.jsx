import React, { Fragment, useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { Button, Card, Dropdown, DropdownToggle, DropdownMenu, DropdownItem, Container, CardBody, CardHeader } from "reactstrap";
import { Breadcrumbs } from "../../../AbstractElements";
import { Link } from "react-router-dom";
import { getAllBooks,UpdateBookLocation  } from "../../../api_handler/addbookapi";




const ViewAllBooks = () => {
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [books, setBooks] = useState([]);
  

  const toggleDropdown = (id) => {
    setActiveDropdown(activeDropdown === id ? null : id);
  };
  const userType=localStorage.getItem("userType");
  const branchId= localStorage.getItem("branchId");

  //fetch books
  
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
          <Button color={row.status === "Active" ? "success" : "danger"} className="px-3">
            {row.status}
          </Button>
        ),
      },
      {
        name: "Action",
        cell: (row) => (
          <Dropdown isOpen={activeDropdown === row.id} toggle={() => toggleDropdown(row.id)}>
            <DropdownToggle caret color="secondary">
              Action
            </DropdownToggle>
            <DropdownMenu style={{ position: 'absolute', top: '100%', left: 0 }}>
              <DropdownItem><Link to={`/${userType}/${branchId}/add-inventory`} state={{ bookDetails: row }}>
                  Book Inventory</Link></DropdownItem>
              <DropdownItem><Link to={`/${userType}/${branchId}/copy-list`}>Copies List</Link></DropdownItem>
              <DropdownItem>Book Place</DropdownItem>
              <DropdownItem><Link to={`/${userType}/${branchId}/add-damage`}>Add Damages</Link></DropdownItem>
              <DropdownItem> <Link to={`/${userType}/${branchId}/edit-book`} state={{ bookDetails: row }} >Edit</Link></DropdownItem>
              <DropdownItem>{row.status === "Active" ? "Inactive" : "Active"}</DropdownItem>
            </DropdownMenu>
          </Dropdown>
        ),
      },
    ];

  // Define dummy data
  // const dummyData = [
  //   {
  //     id: 1,
  //     bookTitle: "Sample Book 1",
  //     category: "Fiction",
  //     author: "Pain Doe",
  //     publisher: "Sample Publisher",
  //     edition: "1st Edition",
  //     status: "Active",
  //     author: "Author 1"
  //   },
  //   {
  //     id: 2,
  //     bookTitle: "Sample Book 2",
  //     category: "Non-Fiction",
  //     author: "Jane Doe",
  //     publisher: "Another Publisher",
  //     edition: "2nd Edition",
  //     status: "Inactive",
  //   },
  //   {
  //       id: 3,
  //       bookTitle: "Sample Book 3",
  //       category: "Horror",
  //       author: "Jone Doe",
  //       publisher: "Another Publisher",
  //       edition: "6th Edition",
  //       status: "Inactive",
  //     },
  //     {
  //       id: 4,
  //       bookTitle: "Sample Book 4",
  //       category: "Biography",
  //       author: "Pane Doe",
  //       publisher: "Another Publisher",
  //       edition: "4th Edition",
  //       status: "Inactive",
  //     },
  //     {
  //       id: 5,
  //       bookTitle: "Sample Book 5",
  //       category: "Biography",
  //       author: "Sane Doe",
  //       publisher: "Another Publisher",
  //       edition: "5th Edition",
  //       status: "Inactive",
  //     },
  //   // Add more sample data as needed
  // ];

  return (
    <Fragment>
      <Breadcrumbs parent="Add Book" mainTitle="All Books" title="View All Books" />

      <Container>
        <Card>
            <CardHeader>
            <Link to={`/${userType}/${branchId}/add-book`} className="d-flex justify-content-end align-item-end">
                <Button color="primary">Add Book</Button>

                </Link>
            </CardHeader>
            <CardBody>
            <DataTable columns={columns} data={books} pagination/>

            </CardBody>

        </Card>
      </Container>
    </Fragment>
  );
};

export default ViewAllBooks;
