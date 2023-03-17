import React from "react";
import { useEffect, useRef, useState } from "react";
import { message, Modal, Table } from "antd";
import moment from "moment";
import { useDispatch } from "react-redux";
import PageTitle from "../components/PageTitle";
import { axiosInstance } from "../helpers/axiosInstance";
import { HideLoading, ShowLoading } from "../redux/alertsSlice";
import { useReactToPrint } from "react-to-print";

const Booking = () => {
  const dispatch = useDispatch();
  const [bookings, setBookings] = useState([]);
  const [showPrintModal, setShowPrintModal] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState(null);

  const getBookings = async () => {
    try {
      dispatch(ShowLoading());
      const response = await axiosInstance.get(
        "https://busbuddy-application.onrender.com/api/bookings/get-bookings-by-user-id",
        {}
      );
      dispatch(HideLoading());
      if (response.data.success) {
        const mappedData = response.data.data.map((booking) => {
          return {
            ...booking,
            ...booking.bus,
            key: booking._id,
          };
        });
        setBookings(mappedData);
      } else {
        message.error(response.data.message);
      }
    } catch (error) {
      dispatch(HideLoading());
      message.error(error.message);
    }
  };

  useEffect(() => {
    getBookings();
  }, []);

  const columns = [
    {
      title: "Bus Name",
      dataIndex: "name",
      key: "bus",
    },
    {
      title: "Bus Number",
      dataIndex: "number",
      key: "bus",
    },
    {
      title: "Journey Date",
      dataIndex: "journeyDate",
      render: (journeyDate) => moment(journeyDate).format("DD-MM-YYYY"),
    },
    {
      title: "Departure Time",
      dataIndex: "departure",
    },
    {
      title: "Seats",
      dataIndex: "seats",
      render: (seats) => {
        return seats.join(", ");
      },
    },
    {
      title: "Action",
      dataIndex: "action",
      render: (text, record) => (
        <div>
          <p
            className="text-md underline"
            onClick={() => {
              setSelectedBooking(record);
              setShowPrintModal(true);
            }}
          >
            Print Ticekt
          </p>
        </div>
      ),
    },
  ];

  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  return (
    <>
      <PageTitle title="Bookings" />
      <div className="mt-2">
        <Table dataSource={bookings} columns={columns} />
      </div>

      {showPrintModal && (
        <Modal
          title="Booking Details"
          onCancel={() => {
            setShowPrintModal(false);
            setSelectedBooking(null);
          }}
          open={showPrintModal}
          okText="Print"
          onOk={handlePrint}
        >
          <hr />
          <div className="d-flex flex-column p-1" ref={componentRef}>
            <p className="text-lg primary-text">{selectedBooking.name}</p>
            <p>
              {selectedBooking.from} - {selectedBooking.to}
            </p>
            <hr />
            <p>
              <span>Journey Date:</span>{" "}
              {moment(selectedBooking.journeyDate).format("DD-MM-YYYY")}
            </p>
            <p>
              <span>Departure Time:</span> {selectedBooking.departure}
            </p>
            <p>
              <span>Arrival Time:</span> {selectedBooking.arrival}
            </p>
            <hr />
            <p className="text-md">
              <span className="text-md">Seat Numbers:</span> <br />
              {selectedBooking.seats.join(", ")}
            </p>
            <hr />
            <p className="text-md">
              <span className="text-md">Total Amount:</span>
            </p>
            <p className="text-md">
              {selectedBooking.fare * selectedBooking.seats.length} /-
            </p>
          </div>
        </Modal>
      )}
    </>
  );
};

export default Booking;
