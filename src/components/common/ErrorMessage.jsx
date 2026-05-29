function ErrorMessage({ message }) {
  return (
    <div
      style={{
        color: "red",
        padding: "20px",
      }}
    >
      {message}
    </div>
  );
}

export default ErrorMessage;