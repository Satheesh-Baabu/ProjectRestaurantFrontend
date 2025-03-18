const Button = ({ text, onClick }) => {
    return (
      <button
        onClick={onClick}
        className="w-full bg-[#FFC107] text-white p-2 rounded-lg cursor-pointer hover:bg-[#ffc107e3] transition"
      >
        {text}
      </button>
    );
  };
  
  export default Button;
  