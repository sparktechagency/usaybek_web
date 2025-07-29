import FavIcon from "@/icon/admin/favIcon";

type BtnProps = {
  onClick?: () => void;
};

// Previewbtn
export function Previewbtn({ onClick }: BtnProps) {
  return (
    <button
      onClick={onClick}
      className="size-[37px] bg-[#FFF3EB] grid place-items-center  rounded-lg cursor-pointer"
    >
      <FavIcon name="eye" />
    </button>
  );
}

// Deletebtn
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


// Editbtn
export function Editbtn({ onClick }: BtnProps) {
  return (
    <button
      onClick={onClick}
      className="size-[37px] bg-[#DBFFDB] grid place-items-center  rounded-lg cursor-pointer"
    >
      <FavIcon name="edit" />
    </button>
  );
}