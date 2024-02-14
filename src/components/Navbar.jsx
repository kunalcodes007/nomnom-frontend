import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Cart from "../screens/Cart";

export default function Navbar() {
  const [cartView, setCartView] = useState(false);

  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    navigate("/login");
  };

  const handleview = () => {
    setCartView(true);
  };
  const closeCartView = () => {
    setCartView(false);
  };

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-success">
        <Link className="navbar-brand fs-1 fst-italic" to="#">
          NOM_NOM_DASH
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto mb-2">
            <li className="nav-item active">
              <Link className="nav-link fs-5" to="#">
                Home <span className="sr-only"></span>
              </Link>
            </li>
            {localStorage.getItem("authToken") ? (
              <li className="nav-item active">
                <Link className="nav-link fs-5" to="#">
                  MY Orders <span className="sr-only"></span>
                </Link>
              </li>
            ) : (
              ""
            )}
          </ul>
          {!localStorage.getItem("authToken") ? (
            <div className="d-flex">
              <Link className="btn bg-white text-success mx-1" to="login">
                LOGIN
              </Link>
              <Link className="btn bg-white text-success mx-1" to="create-user">
                SIGNUP
              </Link>
            </div>
          ) : (
            <div>
              <div
                className="bg-white text-success mx-2 btn"
                onClick={handleview}
                type="button"
                class="btn btn-primary"
                data-bs-toggle="modal"
                data-bs-target="#exampleModal"
              >
                My Cart{" "}
                {cartView ? (
                  <>
                    <div
                      class="modal fade"
                      id="exampleModal"
                      tabindex="-1"
                      role="dialog"
                      aria-labelledby="exampleModalLabel"
                      aria-hidden="true"
                    >
                      <div class="modal-dialog" role="document">
                        <div class="modal-content">
                          <div class="modal-header">
                            <h5 class="modal-title" id="exampleModalLabel">
                              YOUR CART
                            </h5>
                            <button
                              type="button"
                              class="close"
                              data-bs-dismiss="modal"
                              aria-label="Close"
                            >
                              <span aria-hidden="true">&times;</span>
                            </button>
                          </div>
                          <div class="modal-body"><Cart></Cart></div>
                          <div class="modal-footer">
                            <button
                              type="button"
                              class="btn btn-secondary"
                              data-bs-dismiss="modal"
                            >
                              Close
                            </button>
                            <button type="button" class="btn btn-primary">
                              Save changes
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </>
                ) : (
                  ""
                )}
              </div>
              <div
                className="bg-white text-danger mx-2 btn"
                onClick={handleLogout}
              >
                LogOut
              </div>
            </div>
          )}
        </div>
      </nav>
    </div>
  );
}
