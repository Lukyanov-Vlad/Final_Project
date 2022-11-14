import { observer } from "mobx-react-lite";

import { useEffect } from "react";
import Loader from "../../../../components/Loader/Loader";
import catalogStore from "../../stores/CatalogStore"
import { CatalogItem } from "./components/CatalogItem";
import { useState } from "react";
import { Pagination } from "antd";





export const CatalogItems=observer(()=>{
   
    const [catalogData,setCatalogData]=useState();
   
    
    const {catalog,categoryId,loadCatalog,loadingCatalogStatus,catalogPerPage,currentCatalogData,setCurrentPage,currentPage}=catalogStore;
    useEffect(()=>{
       
           
            loadCatalog(categoryId);
            setCurrentPage(1);
          
    },[categoryId]);
    useEffect(()=>{ 
        
        loadCatalog(categoryId);
        
    },[currentPage])

    
   
    return(
        <div className="catalog_wrapper">
        {loadingCatalogStatus && <Loader/>}
       
        {!loadingCatalogStatus && catalog && currentCatalogData.map((item)=><CatalogItem key={item.id} product={item}/>)}
        
      
  
        {!loadingCatalogStatus && catalog && <Pagination onChange={(value)=>{setCurrentPage(value)}}
                                                   
                                                    total={catalog.length}
                                                    pageSize={catalogPerPage}
                                                    current={currentPage}
                                                    />}
        </div>
       
    )
})