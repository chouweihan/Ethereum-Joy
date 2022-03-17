import { SvgIconComponent } from "@mui/icons-material";
import ListAltIcon from '@mui/icons-material/ListAlt';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';  
import AddchartIcon from '@mui/icons-material/Addchart';
import SentimentSatisfiedOutlinedIcon from '@mui/icons-material/SentimentSatisfiedOutlined';

export interface IDrawerLink {
    label: string
    url: string
    icon: SvgIconComponent
}

export const drawerLinks: Array<IDrawerLink> = [
  {
    label: "Transactions",
    url: "/",
    icon: ListAltIcon
  },
  {
    label: "Information",
    url: "/information",
    icon: AddchartIcon
  },
  {
    label: "NFT",
    url: "/nft",
    icon: SentimentSatisfiedOutlinedIcon
  },
//   {
//     label: "About Me",
//     url: "/about",
//     icon: AccountCircleIcon
//   },
];
