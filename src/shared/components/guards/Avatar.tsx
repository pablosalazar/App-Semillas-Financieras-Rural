import undefinedGender from "@/assets/images/avatar/undefined.png";
import manGender from "@/assets/images/avatar/male.png";
import womanGender from "@/assets/images/avatar/female.png";

interface AvatarProps {
  gender?: string;
  className?: string;
}

export const Avatar = ({ gender, className }: AvatarProps) => {
  return (
    <div
      className={`w-22 h-22 ${className} border-4 border-(--orange-light) rounded-full`}
    >
      <div className="border-4 border-white rounded-full">
        <img
          src={
            gender === "Masculino"
              ? manGender
              : gender === "Femenino"
              ? womanGender
              : undefinedGender
          }
          alt=""
          className="w-full h-full object-cover"
        />
      </div>
    </div>
  );
};
