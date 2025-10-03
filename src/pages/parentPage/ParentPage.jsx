import { useState, useEffect } from "react";
const ParentPage = () => {
    useEffect(() => {
    document.title = "Parent";
  }, []);
    return(
        <div>Parent Layout</div>
    )
}

export default ParentPage;