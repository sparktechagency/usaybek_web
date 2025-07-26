import FavIcon from "@/icon/admin/favIcon";

type BtnProps = {
  onClick?: () => void;
};

export function Editbtn({ onClick }: BtnProps) {
  return (
    <button
      onClick={onClick}
      className="size-[37px] bg-[#FFF3EB] grid place-items-center  rounded-lg cursor-pointer"
    >
      <FavIcon name="eye" />
    </button>
  );
}

// Editbtn
export function Deletebtn({ onClick }: BtnProps) {
  return (
    <button
      onClick={onClick}
      className="size-[37px] grid place-items-center text-[#FF5353] bg-[#FFE8E8] rounded-lg cursor-pointer"
    >
      <FavIcon name="delete" />
    </button>
  );
}