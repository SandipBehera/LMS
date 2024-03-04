import { branchID } from "../Constant";
import { WebApi } from "../api";

export const addBook = async (
  book_name,
  book_location,
  book_category,
  book_author,
  book_publisher,
  book_vendor,
  book_isbn_code,
  published_year,
  program,
  department,
  program_year,
  book_volume,
  pages,
  subject,
  language,
  book_edition,
  book_material_type,
  book_sub_material_type,
  book_class_no,
  book_year_of_publication,
  book_page_no,
  book_place_publication,
  book_accession_register,
  date_of_entry,
  financial_year
) => {
  return await fetch(`${WebApi}/create-book`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      Cookie: document.cookie,
    },
    body: JSON.stringify({
      book_name: book_name,
      book_location: book_location,
      book_category: book_category,
      book_author: book_author,
      book_publisher: book_publisher,
      book_vendor: book_vendor,
      book_isbn_code: book_isbn_code,
      published_year: published_year,
      program: program,
      department: JSON.stringify(department),
      program_year: JSON.stringify(program_year),
      book_volume: book_volume,
      pages: pages,
      subject: subject,
      language: language,
      book_edition: book_edition,
      book_material_type: book_material_type,
      book_sub_material_type: book_sub_material_type,
      book_class_no: book_class_no,
      book_year_of_publication: book_year_of_publication,
      book_page_no: book_page_no,
      book_place_publication: book_place_publication,
      book_accession_register: book_accession_register,
      date_of_entry: date_of_entry,
      financial_year: financial_year,
      branch_id: branchID,
    }),
  })
    .then((response) => {
      return response.json();
    })
    .catch((error) => {
      return error;
    });
};

//get all book
export const getAllBooks = async () => {
  return await fetch(`${WebApi}/get-all-books/${branchID}`, {
    method: "GET",
    credentials: "include",
    headers: {
      cookie: document.cookie,
    },
  }).then((response) => response.json());
};

//update book
export const UpdateBookLocation = async (
  book_name,
  book_location,
  book_category,
  book_author,
  book_publisher,
  book_vendor,
  book_isbn_code,
  published_year,
  program,
  department,
  program_year,
  book_volume,
  pages,
  subject,
  language,
  book_edition,
  book_material_type,
  book_sub_material_type,
  book_class_no,
  book_year_of_publication,
  book_page_no,
  book_place_publication,
  book_accession_register,
  date_of_entry,
  financial_year,
  id
) => {
  return await fetch(`${WebApi}/update-book/${id}`, {
    method: "PUT",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      Cookie: document.cookie,
    },
    body: JSON.stringify({
      book_name: book_name,
      book_location: book_location,
      book_category: book_category,
      book_author: book_author,
      book_publisher: book_publisher,
      book_vendor: book_vendor,
      book_isbn_code: book_isbn_code,
      published_year: published_year,
      program: program,
      department: department,
      program_year: program_year,
      book_volume: book_volume,
      pages: pages,
      subject: subject,
      language: language,
      book_edition: book_edition,
      book_material_type: book_material_type,
      book_sub_material_type: book_sub_material_type,
      book_class_no: book_class_no,
      book_year_of_publication: book_year_of_publication,
      book_page_no: book_page_no,
      book_place_publication: book_place_publication,
      book_accession_register: book_accession_register,
      date_of_entry: date_of_entry,
      financial_year: financial_year,
      branch_id: branchID,
    }),
  }).then((response) => {
    return response.json();
  });
};
