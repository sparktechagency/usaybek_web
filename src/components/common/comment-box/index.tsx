"use client";
import React, { useState } from "react";
import Avatars from "@/components/reuseable/avater";
import { SmallCicle } from "@/components/reuseable/small-circle";
import { Button, Input } from "@/components/ui";
import FavIcon from "@/icon/admin/favIcon";
import { cn } from "@/lib/utils";
import { ChevronDown } from "lucide-react";

interface CommentType {
  id: number;
  name: string;
  time: string;
  text: string;
  likes: string;
}

const commentsData: CommentType[] = [
  {
    id: 1,
    name: "John Doe",
    time: "2 days ago",
    text: "Very informative video. I will obviously take your service.",
    likes: "2.6k",
  },
  {
    id: 2,
    name: "Jane Smith",
    time: "1 day ago",
    text: "Thanks for sharing this. It was super helpful!",
    likes: "1.1k",
  },
];

export default function CommentBox() {
  const [openReplies, setOpenReplies] = useState<number | null>(null);
  const [openReplyBox, setOpenReplyBox] = useState<number | null>(null);

  const toggleReplies = (id: number) => {
    setOpenReplies(openReplies === id ? null : id);
  };

  const toggleReplyBox = (id: number) => {
    setOpenReplyBox(openReplyBox === id ? null : id);
  };

  return (
    <div className="mt-6 space-y-6">
      {commentsData.map((comment) => (
        <CommentItem
          key={comment.id}
          comment={comment}
          isRepliesOpen={openReplies === comment.id}
          isReplyBoxOpen={openReplyBox === comment.id}
          onToggleReplies={() => toggleReplies(comment.id)}
          onToggleReplyBox={() => toggleReplyBox(comment.id)}
        />
      ))}
    </div>
  );
}

function CommentItem({
  comment,
  isRepliesOpen,
  isReplyBoxOpen,
  onToggleReplies,
  onToggleReplyBox,
}: {
  comment: CommentType;
  isRepliesOpen: boolean;
  isReplyBoxOpen: boolean;
  onToggleReplies: () => void;
  onToggleReplyBox: () => void;
}) {
  return (
    <div className="flex gap-3">
      <Avatars src={""} fallback={comment.name.charAt(0)} alt={comment.name} />
      <div className="flex-1">
        {/* Name and Time */}
        <div className="flex items-center gap-2 text-sm">
          <span className="font-semibold">{comment.name}</span>
          <span className="text-gray-500">
            <SmallCicle /> {comment.time}
          </span>
        </div>

        {/* Comment Text and Like */}
        <div className="flex items-center space-x-8 mt-1">
          <p className="text-gray-800">{comment.text}</p>
          <span className="flex items-center gap-1 text-gray-600">
            <FavIcon
              name="love"
              hoverColor="#ef4444"
              className="size-4 cursor-pointer"
            />{" "}
            {comment.likes}
          </span>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-4 mt-2 text-sm text-gray-600">
          <Button
            variant="ghost"
            size="sm"
            className="text-blue-600 hover:text-blue-600/90 flex items-center gap-1"
            onClick={onToggleReplies}
          >
            See Replies
            <ChevronDown
              className={cn(
                "transition-transform duration-200",
                isRepliesOpen ? "rotate-180" : ""
              )}
            />
          </Button>
          <Button
            variant="ghost"
            className="bg-white rounded-full text-blacks/80 hover:bg-white h-6"
            size="sm"
            onClick={onToggleReplyBox}
          >
            Reply
          </Button>
        </div>

        {/* Replies */}
        {isRepliesOpen && <Replies className="mt-3" />}

        {/* Reply Box */}
        {isReplyBoxOpen && <ReplyBox className="mt-3" />}
      </div>
    </div>
  );
}

function Replies({ className }: { className?: string }) {
  return (
    <div className={cn("flex gap-3", className)}>
      <Avatars src={""} fallback="J" alt="John Doe" />
      <div className="flex-1">
        <div className="flex items-center gap-2 text-sm">
          <span className="font-semibold">John Doe</span>
          <span className="text-gray-500">
            <SmallCicle /> 1 day ago
          </span>
        </div>
        <p className="mt-1 text-gray-800">
          Thanks for sharing your thoughts!
        </p>
      </div>
    </div>
  );
}

function ReplyBox({ className }: { className?: string }) {
  return (
    <div className={cn("flex gap-3", className)}>
      <Avatars src={""} fallback="Y" alt="Your Name" />
      <div className="flex-1">
        <Input
          placeholder="Write your reply here..."
          className="border-x-0 flex-1 border-t-0 rounded-none"
        />
        <ul className="flex space-x-1 mt-2 justify-end">
          <li>
            <Button
              variant="ghost"
              className="bg-white rounded-full text-blacks/80 hover:bg-white h-6"
              size="sm"
            >
              Cancel
            </Button>
          </li>
          <li>
            <Button
              variant="ghost"
              className="bg-grays-place hover:bg-grays-place rounded-full text-blacks/80 h-6"
              size="sm"
            >
              Save
            </Button>
          </li>
        </ul>
      </div>
    </div>
  );
}



// import Avatars from "@/components/reuseable/avater";
// import { SmallCicle } from "@/components/reuseable/small-circle";
// import { Button, Input } from "@/components/ui";
// import FavIcon from "@/icon/admin/favIcon";
// import { cn } from "@/lib/utils";
// import { ChevronDown } from "lucide-react";
// import React, { useState } from "react";

// export default function CommentBox() {
//   const [isSee,setIsSee]=useState(false)
//   const [isReplay,setIsReplay]=useState(false)
  
//   return (
//     <div className="mt-6 space-y-6">
    
//       <div className="flex gap-3">
//         <Avatars src={""} fallback="J" alt="John Doe" />
//         <div className="flex-1">
//           <div className="flex items-center gap-2 text-sm">
//             <span className="font-semibold">John Doe</span>
//             <span className="text-gray-500">
//               <SmallCicle />2 days ago
//             </span>
//           </div>
//           <div className="flex items-center space-x-10">
//             <p className="mt-1 text-gray-800">
//               Very informative video. I will obviously take your service.
//             </p>
//             <span className="flex items-center gap-1">
//               <FavIcon
//                 name="love"
//                 hoverColor="#ef4444"
//                 className="size-4 cursor-pointer"
//               />{" "}
//               2.6k
//             </span>
//           </div>
//           <div onClick={()=>setIsSee(!isSee)} className="flex items-center gap-4 mt-2 text-sm text-gray-600">
//             <Button
//               variant="ghost"
//               size="sm"
//               className="text-blue-600 hover:text-blue-600/90"
//             >
//               See Reply <ChevronDown/>
//             </Button>
//             <Button
//               variant="ghost"
//               className="bg-white rounded-full text-blacks/80 hover:bg-white h-6"
//               size="sm"
//               onClick={()=>setIsReplay(!isReplay)}
//             >
//               Reply
//             </Button>
//           </div>
//            {isSee && (
//              <SeeBox className="mt-2 mb-6"/>
//            )}
//            {isReplay && (
//              <ReplayBox className="mt-2 mb-6"/>
//            )}
//         </div>
//       </div>

//       <div className="flex gap-3">
//         <Avatars src={""} fallback="J" alt="John Doe" />
//         <div className="flex-1">
//           <div className="flex items-center gap-2 text-sm">
//             <span className="font-semibold">John Doe</span>
//             <span className="text-gray-500">
//               <SmallCicle />2 days ago
//             </span>
//           </div>
//           <div className="flex items-center space-x-10">
//             <p className="mt-1 text-gray-800">
//               Very informative video. I will obviously take your service.
//             </p>
//             <span className="flex items-center gap-1">
//               <FavIcon
//                 name="love"
//                 hoverColor="#ef4444"
//                 className="size-4 cursor-pointer"
//               />{" "}
//               2.6k
//             </span>
//           </div>
//           <div onClick={()=>setIsSee(!isSee)} className="flex items-center gap-4 mt-2 text-sm text-gray-600">
//             <Button
//               variant="ghost"
//               size="sm"
//               className="text-blue-600 hover:text-blue-600/90"
//             >
//               See Reply <ChevronDown/>
//             </Button>
//             <Button
//               variant="ghost"
//               className="bg-white rounded-full text-blacks/80 hover:bg-white h-6"
//               size="sm"
//               onClick={()=>setIsReplay(!isReplay)}
//             >
//               Reply
//             </Button>
//           </div>
//            {isSee && (
//              <SeeBox className="mt-2 mb-6"/>
//            )}
//            {isReplay && (
//              <ReplayBox className="mt-2 mb-6"/>
//            )}
//         </div>
//       </div>
     
//     </div>
//   );
// }

// function SeeBox({className}:{className?:string}) {
//   return (
//     <div className={cn(`flex gap-3`,className)}>
//     <Avatars src={""} fallback="J" alt="John Doe" />
//     <div className="flex-1">
//       <div className="flex items-center gap-2 text-sm">
//         <span className="font-semibold">John Doe</span>
//         <span className="text-gray-500">
//           <SmallCicle />2 days ago
//         </span>
//       </div>
//       <div className="flex items-center space-x-10">
//         <p className="mt-1 text-gray-800">
//           Very informative video. I will obviously take your service.
//         </p>
//         <span className="flex items-center gap-1">
//           <FavIcon
//             name="love"
//             hoverColor="#ef4444"
//             className="size-4 cursor-pointer"
//           />{" "}
//           2.6k
//         </span>
//       </div>
//     </div>
//   </div>
//   )
// }

// function ReplayBox({className}:{className?:string}) {
//     return (
//       <div className={cn(`flex gap-3`,className)}>
//       <Avatars src={""} fallback="J" alt="John Doe" />
//       <div className="flex-1">
//          <Input placeholder="Write Your Replay hare" className="border-x-0 flex-1 border-t-0 rounded-none"/>
//           <ul className="flex space-x-1 mt-2 justify-end">
//              <li>
//              <Button
//               variant="ghost"
//               className="bg-white rounded-full text-blacks/80 hover:bg-white h-6"
//               size="sm"
//             >
//               Cancel
//             </Button>
//              </li>
//              <li>
//              <Button
//               variant="ghost"
//               className="bg-grays-place hover:bg-grays-place rounded-full text-blacks/80 h-6"
//               size="sm"
//             >
//               Save
//             </Button>
//              </li>
//           </ul>
//       </div>
//     </div>
//     )
//   }
