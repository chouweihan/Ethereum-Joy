export function retIPFSorHTTPs(link?: string) {
    if(!link) return "";

    if(link.startsWith("https")) 
      return link;
    
    if(link.startsWith("ipfs://ipfs/"))
      return link.replace("ipfs://ipfs/", "https://ipfs.io/ipfs/");

    if(link.startsWith("ipfs")) 
      return link.replace("ipfs://", "https://ipfs.io/ipfs/");
    
    return `https://ipfs.io/ipfs/${link}`
  }