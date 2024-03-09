import { branchID } from "../Constant";
import { WebApi } from "../api";

export const getItemCode = async (book_id, branch_id) => {
    const obj = {
        book_id: book_id,
        branch_id: branchID
      }
  const queryParams = new URLSearchParams(obj).toString();
  console.log(book_id, branchID)

  const url = `${WebApi}/get-item-code?${queryParams}`;

  return await fetch(url, {
    method: "GET",
    credentials: "include",
    headers: {
      cookie: document.cookie,
    },
  }).then((response) => response.json());
};

export const Add_Book_Inventory = async (
    vendor_id, item_code, item_quantity, book_id, branchID
  ) => {
    return await fetch(`${WebApi}/create-book-quantity`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        Cookie: document.cookie,
      },
      body: JSON.stringify({
        vendor_id: vendor_id,
        item_code: item_code,
        item_quantity: item_quantity,
        book_id:book_id,
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

 