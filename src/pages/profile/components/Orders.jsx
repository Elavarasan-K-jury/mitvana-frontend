import { cancelOrder, getOrderByUserId } from "@src/api/services/orderService";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { Dropdown, Modal, Button, Form } from "react-bootstrap";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { backendUrl } from "@src/api/axios";
import { toast } from "react-hot-toast";

function Orders() {
  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [filterPeriod, setFilterPeriod] = useState("past 3 months");
  const [showModal, setShowModal] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [cancellationReason, setCancellationReason] = useState("");

  useEffect(() => {
    const getOrderHistory = async () => {
      const res = await getOrderByUserId();
      const filteredOrders = res?.order?.filter(order => {
        return !/fail/i.test(order.orderStatus);
      });
      setOrders(filteredOrders || []);
      filterOrders("3 months", res?.order || []);
    };
    getOrderHistory();
  }, []);

  const filterOrders = (period, orderList) => {
    const now = new Date();
    let filtered = orderList || orders;
    switch (period) {
      case "3 months":
        filtered = filtered.filter(
          (order) =>
            new Date(order?.createdAt) >=
            new Date(now.setMonth(now.getMonth() - 3))
        );
        break;
      case "6 months":
        filtered = filtered.filter(
          (order) =>
            new Date(order.createdAt) >=
            new Date(now.setMonth(now.getMonth() - 6))
        );
        break;
      case "1 year":
        filtered = filtered.filter(
          (order) =>
            new Date(order.createdAt) >=
            new Date(now.setFullYear(now.getFullYear() - 1))
        );
        break;
      case "2 years":
        filtered = filtered.filter(
          (order) =>
            new Date(order.createdAt) >=
            new Date(now.setFullYear(now.getFullYear() - 2))
        );
        break;
      default:
        break;
    }
    setFilteredOrders(filtered);
  };

  const handleFilterChange = (period) => {
    setFilterPeriod(period);
    filterOrders(period, orders);
  };

  const handleDownload = (item) => {
    const sanitizedOrderID = item.orderID.replace(/#/g, "_");
    fetch(`${backendUrl}${item.orderInvoice}`)
      .then((response) => {
        if (response.ok) {
          return response.blob();
        }
        throw new Error("Network response was not ok.");
      })
      .then((blob) => {
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `invoice_${sanitizedOrderID}.pdf`;
        document.body.appendChild(a);
        a.click();
        a.remove();
        window.URL.revokeObjectURL(url);
      })
      .catch((error) => {
        console.error("Error downloading the invoice:", error);
      });
  };

  const handleCancelOrder = (item) => {
    setSelectedOrder(item);
    setShowModal(true);
  };

  const confirmCancelOrder = async () => {
    try {
      const obj = {
        orderId: selectedOrder?._id,
        orderStatus: "Cancelled By user",
        reason: cancellationReason, // Include the reason for cancellation
      };

      const res = await cancelOrder(obj);
      toast.dismiss();
      toast.success(res?.message);
      setShowModal(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="custom-text">
      {filteredOrders?.length === 0 && (
        <div className="bg-gray-100 p-3 border-top custom-border-color border-top-4 d-flex justify-content-between small">
          <p>No Order has been made yet.</p>
          <Link href="/shop" className="fw-semibold custom-text">
            BROWSE PRODUCTS
          </Link>
        </div>
      )}

      <Dropdown className="mb-4">
        <Dropdown.Toggle
          className="d-flex align-items-center justify-content-between featurnBtn rounded dropdown"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          {filterPeriod}
          <FontAwesomeIcon icon={faChevronDown} className="ms-2" />
        </Dropdown.Toggle>
        <Dropdown.Menu className="dropdown-menu filter-dropdown">
          {[
            "past 3 months",
            "past 6 months",
            "past 1 year",
            "past 2 years",
          ].map((period) => (
            <Dropdown.Item
              key={period}
              onClick={() => handleFilterChange(period)}
            >
              {period}
            </Dropdown.Item>
          ))}
        </Dropdown.Menu>
      </Dropdown>

      {filteredOrders?.map((item) => {
        const totalQuantity = item?.orderItems?.reduce(
          (acc, curr) => acc + curr.quantity,
          0
        );
        const orderDate = new Date(item?.createdAt).toLocaleDateString();
        return (
          <div
            key={item?._id}
            className="border rounded-lg p-3 mb-4 bg-white"
          >
            {/* Order Header */}
            <div className="mb-3">
              <h6 className="fw-semibold mb-1">
                Order Id : {item?.orderID}
              </h6>

              <p className="text-muted mb-0">
                Order Date : {orderDate}
              </p>
            </div>

            {/* Amount */}
            <div className="mb-3">
              <strong>
                ₹{item?.totalPrice?.toFixed(2)}
              </strong>

              <span className="ms-2">
                for {totalQuantity} items
              </span>
            </div>

            {/* Status */}
            <div className="mb-3">
              <span
                className={`${item?.orderStatus?.toLowerCase() === "delivered"
                    ? "custom-green-tag"
                    : "custom-yellow-tag"
                  } px-3 py-1 fw-semibold`}
              >
                {item?.orderStatus?.toUpperCase()}
              </span>

              <p className="mt-2 mb-0">
                Your Order has been {item?.orderStatus}
              </p>
            </div>

            {/* Buttons */}
            <div className="d-flex flex-column gap-2">
              <Link href={`/view-order?orderId=${item?._id}`}>
                <button className="custom-outline-button w-100 py-2">
                  View Order
                </button>
              </Link>

              {!item?.orderStatus?.includes("Cancelled") &&
                item?.orderStatus !== "Dispatched" &&
                item?.orderStatus !== "Delivered" && (
                  <button
                    className="custom-danger-button w-100 py-2"
                    onClick={() => handleCancelOrder(item)}
                  >
                    Cancel Order
                  </button>
                )}

              {item?.orderInvoice && (
                <button
                  onClick={() => handleDownload(item)}
                  className="custom-outline-button w-100 py-2"
                >
                  Download Invoice
                </button>
              )}
            </div>
          </div>
        );
      })}

      {/* Modal for cancellation reason */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Cancel Order</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group controlId="cancellationReason">
            <Form.Label>Reason for Cancellation</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              placeholder="Enter reason for cancellation"
              value={cancellationReason}
              onChange={(e) => setCancellationReason(e.target.value)}
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Close
          </Button>
          <Button
            variant="danger"
            onClick={confirmCancelOrder}
            disabled={!cancellationReason}
          >
            Confirm Cancel
          </Button>
        </Modal.Footer>
      </Modal>

    </div>
  );
}

export default Orders;
