import { RiAiGenerate, RiSettings4Line } from 'react-icons/ri';
import { IoDocumentTextOutline } from "react-icons/io5";

export const sidebarLinks = [
  {
    Icon: IoDocumentTextOutline,
    route: "/upload-document",
    label: "Upload Document",
  },
  {
    Icon: RiAiGenerate,
    route: "/analyze-document",
    label: "Analyze Document",
  },
  {
    Icon: RiSettings4Line,
    route: "/settings",
    label: "Settings",
  },
];
  
  export const profileTabs = [
    { value: "threads", label: "Threads", icon: "/assets/reply.svg" },
    { value: "replies", label: "Replies", icon: "/assets/members.svg" },
    { value: "tagged", label: "Tagged", icon: "/assets/tag.svg" },
  ];
  
  export const communityTabs = [
    { value: "threads", label: "Threads", icon: "/assets/reply.svg" },
    { value: "members", label: "Members", icon: "/assets/members.svg" },
    { value: "requests", label: "Requests", icon: "/assets/request.svg" },
  ];
  