import React from "react";
import { LocalApi, WebApi } from "../api";
import { branchID } from "../Constant";

export const Add_Book_Category = async (
  category_name,
  category_description,
  status
) => {
  return await fetch(`${WebApi}/create-book-category`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      Cookie: document.cookie,
    },
    body: JSON.stringify({
      category_name: category_name,
      category_description: category_description,
      status: status,
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

export const GetAllBookCategories = async () => {
  return await fetch(`${WebApi}/get-all-book-categories/${branchID}`, {
    method: "GET",
    credentials: "include",
    headers: {
      Cookie: document.cookie,
    },
  }).then((response) => response.json());
};

export const GetBookCategory = async (id) => {
  return await fetch(`${WebApi}/get-book-category/${id}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Cookie: document.cookie,
    },
  }).then((response) => response.json());
};

export const UpdateBookCategory = async (
  id,
  category_name,
  category_description,
  status
) => {
  return await fetch(`${WebApi}/update-book-category/${id}`, {
    method: "PUT",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      Cookie: document.cookie,
    },
    body: JSON.stringify({
      category_name: category_name,
      category_description: category_description,
      status: status,
      branch_id: branchID,
    }),
  }).then((response) => {
    return response.json();
  });
};

export const UploadBulkCategory = async (data) => {
  return await fetch(`${LocalApi}/upload-bulk-category`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      cookie: document.cookie,
    },
    body: JSON.stringify(data),
  }).then((response) => response.json());
};
