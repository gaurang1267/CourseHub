import { redirect } from "react-router-dom";
import { removeUserFromLocalStorage } from "../Utils/Auth";

export function action() {
  removeUserFromLocalStorage();
  return redirect("/");
}
