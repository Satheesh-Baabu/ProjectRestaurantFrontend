const Button = ({ text, onClick }) => {
    return (
      <button
        onClick={onClick}
        className="w-full bg-orange-600 text-white p-2 rounded-lg hover:bg-orange-500 transition"
      >
        {text}
      </button>
    );
  };
  
  export default Button;
  