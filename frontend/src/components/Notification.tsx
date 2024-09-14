import React, { useEffect, useState } from "react";

interface NotificationProps {
  type: string;
  message: string;
  onClose?: () => void; // Optional close handler
  timeout?: number; // Optional timeout in milliseconds
}

const Notification: React.FC<NotificationProps> = ({
  type,
  message,
  onClose,
  timeout = 5000, // Default timeout of 5000ms (5 seconds)
}) => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
      if (onClose) onClose();
    }, timeout);

    return () => clearTimeout(timer); // Clear timeout if component unmounts
  }, [timeout, onClose]);

  if (!visible) return null;

  let bgColor, icon, borderColor;

  switch (type) {
    case "error":
      bgColor = "bg-red-500";
      borderColor = "border-red-600";
      icon = (
        <svg
          className="w-6 h-6 text-red-300"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M10 14h2v2h-2zM10 10h2v4h-2z"
          />
        </svg>
      );
      break;
    case "success":
      bgColor = "bg-green-500";
      borderColor = "border-green-600";
      icon = (
        <svg
          className="w-6 h-6 text-green-300"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M5 13l4 4L19 7"
          />
        </svg>
      );
      break;
    case "notification":
      bgColor = "bg-blue-500";
      borderColor = "border-blue-600";
      icon = (
        <svg
          className="w-6 h-6 text-blue-300"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M3 10h18M3 14h18M3 18h18"
          />
        </svg>
      );
      break;
    default:
      bgColor = "bg-gray-500";
      borderColor = "border-gray-600";
      icon = null;
      break;
  }

  return (
    <div
      className={`fixed top-0 right-0 mt-4 mr-4 w-80 ${bgColor} text-white rounded-lg shadow-lg border-l-4 ${borderColor}`}
    >
      <div className="flex items-center p-4">
        {icon}
        <span className="flex-1 ml-3">{message}</span>
        {onClose && (
          <button
            onClick={() => {
              setVisible(false);
              onClose();
            }}
            className="ml-3 text-white hover:text-gray-200 focus:outline-none"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        )}
      </div>
    </div>
  );
};

export default Notification;
