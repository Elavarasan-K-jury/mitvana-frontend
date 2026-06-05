import React from "react";
import { createPortal } from "react-dom";
import { LogOut } from "lucide-react";

const LogoutModal = ({ show, onClose, onConfirm }) => {
    if (!show) return null;

    return createPortal(
        <div
            className="fixed inset-0 z-[9999] flex items-center justify-center p-4"
            style={{ backgroundColor: "rgba(0,0,0,0.6)" }}
            onClick={onClose}
        >
            <div
                onClick={(e) => e.stopPropagation()}
                className="relative bg-white rounded-3xl shadow-2xl w-full max-w-[560px] animate-fadeIn overflow-hidden"
            >
                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute top-5 right-5 w-10 h-10 rounded-full bg-neutral-100 hover:bg-neutral-200 flex items-center justify-center transition-all"
                >
                    ✕
                </button>

                <div className="px-10 py-10 text-center">

                    {/* Icon */}
                    <div
                        className="mx-auto mb-5 flex items-center justify-center rounded-full"
                        style={{
                            width: "96px",
                            height: "96px",
                            background: "#f5f5f5",
                        }}
                    >
                        <LogOut
                            size={42}
                            color="#193A43"
                            strokeWidth={1.8}
                        />
                    </div>

                    {/* Heading */}
                    <h2
                        className="fw-bold mb-3"
                        style={{
                            fontSize: "28px",
                            color: "#193A43",
                        }}
                    >
                        Logout Account?
                    </h2>

                    {/* Description */}
                    <p
                        className="mx-auto mb-5"
                        style={{
                            maxWidth: "420px",
                            color: "#6b7280",
                            fontSize: "16px",
                            lineHeight: "1.8",
                        }}
                    >
                        Are you sure you want to logout?
                        You'll need to sign in again to access your
                        orders, addresses, wishlist and account details.
                    </p>

                    {/* Buttons */}
                    <div className="flex justify-center gap-4 mb-4">
                        <button
                            onClick={onClose}
                            className="px-5 py-3 rounded-full border"
                            style={{
                                minWidth: "150px",
                                fontWeight: 600,
                            }}
                        >
                            Stay Logged In
                        </button>

                        <button
                            onClick={onConfirm}
                            className="px-5 py-3 rounded-full text-white border-0"
                            style={{
                                minWidth: "150px",
                                backgroundColor: "#193A43",
                                fontWeight: 600,
                            }}
                        >
                            Logout
                        </button>
                    </div>
                </div>
            </div>
        </div>,
        document.body
    );
};

export default LogoutModal;