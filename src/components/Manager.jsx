"use client"

import React, { useRef, useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import { v4 as uuidv4 } from "uuid";
import "react-toastify/dist/ReactToastify.css";

const Manager = () => {
  const ref = useRef();
  const passwordRef = useRef();
  const [form, setForm] = useState({ site: "", username: "", password: "" });
  const [passwordArray, setpasswordArray] = useState([]);

  useEffect(() => {
    const passwords = localStorage.getItem("passwords");
    if (passwords) setpasswordArray(JSON.parse(passwords));
  }, []);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const showPassword = () => {
    if (passwordRef.current.type === "password") {
      passwordRef.current.type = "text";
      ref.current.src = "/public/icons/view.png";
    } else {
      passwordRef.current.type = "password";
      ref.current.src = "/public/icons/hide.png";
    }
  };

  const savePassword = () => {
    if (form.site.length > 3 && form.username.length > 3 && form.password.length > 3) {
      const newEntry = { ...form, id: uuidv4() };
      const updated = [...passwordArray, newEntry];
      setpasswordArray(updated);
      localStorage.setItem("passwords", JSON.stringify(updated));
      setForm({ site: "", username: "", password: "" });

      toast.success("Password saved successfully!");
    } else {
      toast.error("Please fill all fields with at least 4 characters.");
    }
  };

  const deletePassword = (id) => {
    if (confirm("Are you sure you want to delete this password?")) {
      const updated = passwordArray.filter((item) => item.id !== id);
      setpasswordArray(updated);
      localStorage.setItem("passwords", JSON.stringify(updated));
      toast.info("Password deleted!");
    }
  };

  const editPassword = (id) => {
    const target = passwordArray.find((item) => item.id === id);
    setForm(target);
    setpasswordArray(passwordArray.filter((item) => item.id !== id));
  };

  const copyText = (text) => {
    navigator.clipboard.writeText(text);
    toast("Copied to clipboard!");
  };

  return (
    <>
      <ToastContainer position="top-right" autoClose={3000} theme="dark" />
      
      {/* Background Glow */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[400px] h-[400px] bg-green-400/20 rounded-full blur-[120px]" />
      </div>

      <div className="max-w-5xl mx-auto px-6 py-12 text-gray-100 pt-21.5">
        {/* Header */}
        <h1 className="text-4xl md:text-5xl font-bold text-center mb-3">
          <span className="text-green-700">&lt;</span>
          <span className="text-black">Pass</span>
          <span className="text-green-700">OP/&gt;</span>
        </h1>
        <p className="text-center text-green-900 mb-10 text-lg">
          Your Own Password Manager
        </p>

        {/* Form Section */}
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl border border-green-500/40 p-6 md:p-8 shadow-xl flex flex-col gap-6">
          <input
            value={form.site}
            onChange={handleChange}
            placeholder="Website URL"
            name="site"
            className="rounded-full px-5 py-3 bg-white/10 text-white border border-green-500/40 placeholder-gray-300 focus:outline-none focus:border-green-400"
            type="text"
          />

          <div className="flex flex-col md:flex-row gap-6">
            <input
              value={form.username}
              onChange={handleChange}
              placeholder="Username"
              name="username"
              className="w-full rounded-full px-5 py-3 bg-white/10 text-white border border-green-500/40 placeholder-gray-300 focus:outline-none focus:border-green-400"
              type="text"
            />

            <div className="relative w-full">
              <input
                ref={passwordRef}
                value={form.password}
                onChange={handleChange}
                placeholder="Password"
                name="password"
                className="w-full rounded-full px-5 py-3 bg-white/10 text-white border border-green-500/40 placeholder-gray-300 focus:outline-none focus:border-green-400"
                type="password"
              />
              <img
                ref={ref}
                onClick={showPassword}
                src="/public/icons/hide.png"
                alt="toggle"
                className="h-6 absolute right-4 top-3 cursor-pointer opacity-80 hover:opacity-100 transition"
              />
            </div>
          </div>

          <button
            onClick={savePassword}
            className="mt-4 flex justify-center items-center gap-2 bg-green-400 text-black font-semibold px-8 py-3 rounded-full hover:bg-green-300 transition border border-green-900"
          >
            <lord-icon
              src="https://cdn.lordicon.com/vjgknpfx.json"
              trigger="hover"
              colors="primary:#000000,secondary:#000000"
              style={{ width: "28px", height: "28px" }}
            ></lord-icon>
            Save Password
          </button>
        </div>

        {/* Saved Passwords */}
        <div className="mt-12">
          <h2 className="text-2xl font-semibold text-center mb-6 text-green-800">Your Passwords</h2>

          {passwordArray.length === 0 ? (
            <p className="text-center text-green-900 text-lg">No passwords saved yet</p>
          ) : (
            <div className="overflow-x-auto rounded-xl border border-green-400/40 bg-white/10 backdrop-blur-md">
              <table className="w-full text-center text-sm md:text-base">
                <thead className="bg-green-800 text-white uppercase tracking-wide">
                  <tr>
                    <th className="p-3">Website</th>
                    <th className="p-3">Username</th>
                    <th className="p-3">Password</th>
                    <th className="p-3">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {passwordArray.map((item) => (
                    <tr
                      key={item.id}
                      className="border-b border-green-500/20 hover:bg-white/5 transition"
                    >
                      <td className="py-3 flex justify-center items-center gap-2">
                        <a
                          href={item.site}
                          target="_blank"
                          className="hover:underline text-green-900"
                        >
                          {item.site}
                        </a>
                        <lord-icon
                          src="https://cdn.lordicon.com/xuoapdes.json"
                          onClick={() => copyText(item.site)}
                          trigger="hover"
                          style={{ width: "22px", height: "22px" }}
                        ></lord-icon>
                      </td>
                      <td className="py-3 flex justify-center items-center gap-2 text-green-900">
                        {item.username}
                        <lord-icon
                          src="https://cdn.lordicon.com/xuoapdes.json"
                          onClick={() => copyText(item.username)}
                          trigger="hover"
                          style={{ width: "22px", height: "22px" }}
                        ></lord-icon>
                      </td>
                      <td className="py-3 flex justify-center items-center gap-2 text-green-900">
                        {item.password}
                        <lord-icon
                          src="https://cdn.lordicon.com/xuoapdes.json"
                          onClick={() => copyText(item.password)}
                          trigger="hover"
                          style={{ width: "22px", height: "22px" }}
                        ></lord-icon>
                      </td>
                      <td className="py-3 flex justify-center gap-4">
                        <lord-icon
                          src="https://cdn.lordicon.com/jzinekkv.json"
                          onClick={() => deletePassword(item.id)}
                          trigger="hover"
                          colors="primary:#121331,secondary:#ff4b4b"
                          style={{ width: "26px", height: "26px" }}
                        ></lord-icon>

                        <lord-icon
                          src="https://cdn.lordicon.com/exymduqj.json"
                          onClick={() => editPassword(item.id)}
                          trigger="hover"
                          colors="primary:#121331,secondary:#00ff88"
                          style={{ width: "26px", height: "26px" }}
                        ></lord-icon>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Manager;
