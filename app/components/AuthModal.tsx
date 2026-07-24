"use client";

import { useEffect, useState, useContext } from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import AuthModalInputs from "./AuthModalInputs";
import useAuth from "../../hooks/useAuth";
import { AuthenticationContext } from "../context/AuthContext";
import { Alert, CircularProgress } from "@mui/material";

const style = {
  position: "absolute" as const,
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "min(400px, 92vw)",
  bgcolor: "background.paper",
  boxShadow: 24,
  maxHeight: "90vh",
  overflowY: "auto" as const,
  p: 4,
  borderRadius: "16px",
};

export default function AuthModal({ isSignIn }: { isSignIn: boolean }) {
  const { error, loading } = useContext(AuthenticationContext);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const { signin, signup } = useAuth();
  const [disabled, setDisabled] = useState(true);
  const [inputs, setInputs] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    city: "",
    password: "",
  });

  const renderContent = (signInContent: string, signUpContent: string) => {
    return isSignIn ? signInContent : signUpContent;
  };

  const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputs({
      ...inputs,
      [e.target.name]: e.target.value,
    });
  };

  useEffect(() => {
    if (isSignIn) {
      setDisabled(!(inputs.password && inputs.email));
    } else {
      setDisabled(
        !(
          inputs.email &&
          inputs.city &&
          inputs.firstName &&
          inputs.lastName &&
          inputs.password &&
          inputs.phone
        )
      );
    }
  }, [inputs, isSignIn]);

  const handleClick = () => {
    if (isSignIn) {
      signin({ email: inputs.email, password: inputs.password }, handleClose);
    } else {
      signup(inputs, handleClose);
    }
  };

  return (
    <div>
      <button
        type="button"
        className={`${
          isSignIn
            ? "bg-[var(--ink)] text-white"
            : "border border-[var(--line)] text-[var(--ink)] bg-white"
        } px-4 py-2 rounded-lg text-sm font-medium transition hover:opacity-90`}
        onClick={handleOpen}
      >
        {renderContent("Sign in", "Sign up")}
      </button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="auth-modal-title"
      >
        <Box sx={style}>
          {loading ? (
            <div className="px-2 py-24 h-full flex justify-center">
              <CircularProgress />
            </div>
          ) : (
            <div className="p-1">
              {error && (
                <Alert severity="error" className="mb-4">
                  {error}
                </Alert>
              )}
              <div className="uppercase font-bold text-center pb-2 border-b mb-2 tracking-wide text-[var(--muted)]">
                <p className="text-sm" id="auth-modal-title">
                  {renderContent("Sign In", "Create Account")}
                </p>
              </div>
              <div className="m-auto">
                <h2 className="font-display text-2xl text-center mb-1">
                  {renderContent(
                    "Log into your account",
                    "Create your Seatly account"
                  )}
                </h2>
                <AuthModalInputs
                  inputs={inputs}
                  handleChangeInput={handleChangeInput}
                  isSignIn={isSignIn}
                />
                <button
                  type="button"
                  className="btn-primary uppercase w-full p-3 rounded-xl text-sm mb-2 disabled:opacity-50"
                  disabled={disabled}
                  onClick={handleClick}
                >
                  {renderContent("Sign In", "Create Account")}
                </button>
              </div>
            </div>
          )}
        </Box>
      </Modal>
    </div>
  );
}
