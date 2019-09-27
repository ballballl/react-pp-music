import React, {lazy, Suspense} from 'react';
import { Redirect } from "react-router-dom"
import {routes as collectionRoutes}  from '@page/Collection/routes/'


const RecommendComponet = lazy(()=>import('@page/Recommend/index'))
const Recommend =(props)=>{
    return(
        <Suspense fallback={null}>
            <RecommendComponet {...props}></RecommendComponet>
        </Suspense>
    )
} 
export const routes = [
        {
          path: "/",
          exact: true,
          render:  ()=> (
            <Redirect to={"/recommend"}/>
          )
        },
        {
          path: "/recommend/",
          key: 'home',
          component: Recommend,
          routes:[
            ...collectionRoutes
          ]
        }
]
