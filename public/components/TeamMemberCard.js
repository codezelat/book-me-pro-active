import Image from "next/image";
const TeamMemberCard = ({ name, quote, image }) => {
  return (
    <div className="w-full  max-w-sm rounded-xl overflow-hidden ">
      <div className="w-full bg-blue-600">
        <Image
          src={image} // Replace with your image path
          width={0}
          height={0}
          layout="responsive"
          alt="Soccer Image 1"
          className="rounded-lg object-cover"
        />
      </div>
      {/* Text Section with Blue Background and Custom Shape */}
      <div className="relative bg-blue-600 p-4 text-white custom-shape">
        <h3 className="text-xl font-extrabold">{name}</h3>
        <p className="mt-2 text-blue-200 pb-8 text-lg">
          <span className="text-2xl text-white ">“</span>
          {quote}
        </p>
      </div>
    </div>
  );
};

export default TeamMemberCard;
