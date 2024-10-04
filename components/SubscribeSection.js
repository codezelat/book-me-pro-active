// components/SubscribeSection.js
const SubscribeSection = () => {
    return (
      <div className="flex justify-center items-center bg-blue-900  rounded-md">
        {/* Input Field */}
        <input
          type="email"
          placeholder="Your email address"
          className="p-3 rounded-l-md w-64 bg-blue-100 text-blue-500 placeholder-blue-500 focus:outline-none"
        />
        {/* Subscribe Button */}
        <button className="p-3 bg-blue-500 text-white rounded-r-md hover:bg-blue-600">
          Subscribe
        </button>
      </div>
    );
  };
  
  export default SubscribeSection;
  