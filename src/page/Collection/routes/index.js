import React, {lazy, Suspense} from 'react';

const CollectionComponet = lazy(()=>import('@page/Collection/index'))
const Collection =(props)=>{
    return(
        <Suspense fallback={null}>
            <CollectionComponet {...props}></CollectionComponet>
        </Suspense>
    )
} 
const ListdetailComponet = lazy(()=>import('@page/Listdetail/index'))

const Listdetail =(props)=>{
    return(
        <Suspense fallback={null}>
            <ListdetailComponet {...props}></ListdetailComponet>
        </Suspense>
    )
} 
export const routes = [
        {
          path: "/recommend/collection/",
          key: '/collection',
          component: Collection,
          routes:[
            {
                path: '/recommend/collection/:id/',
                component: Listdetail,
            }
          ]
        }
]
