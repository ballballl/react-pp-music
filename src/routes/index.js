import React, {lazy, Suspense} from 'react';
import {routes as recommendRoutes}  from '@page/Recommend/routes/'

const LayoutComponent = lazy(() => import("../layout"));
const Layout = (props) => {
  return (
    <Suspense fallback={null}>
      <LayoutComponent {...props}></LayoutComponent>
    </Suspense>
  )
}
//  console.log(recommendRoutes)
export default [
  {
    path: "/",
    component: Layout,
    routes: [
      ...recommendRoutes,
      // ...collectionRoutes,
    ]
  }
]
