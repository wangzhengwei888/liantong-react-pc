import areaData2 from './area';
//收货地址需要支持四级
export function getAreaData(areaDataPro) {
 let areaData = []
 if(areaDataPro) {
  areaData = areaDataPro
 }else if(localStorage.getItem("area")){
  areaData = localStorage.getItem("area")
 }
 if (areaData.length) {
  let newAreaData = JSON.parse(areaData);
  let convertedData = newAreaData.map(item => {
   let province = {
    value: item.areaId,
    label: item.areaName,
   };

   const cityList = item.childern.map(city => {
    return {
     value: city.areaId,
     label: city.areaName,
     children: city.childern.map(area => {
      return {
       value: area.areaId,
       label: area.areaName,
       children: area.childern.length && area.childern.map(four =>{
        return {
         value: four.areaId,
         label: four.areaName,
         children: four.childern.length && four.childern.map(five => {
          return {
           value: five.areaId,
           label: five.areaName
          }
         })
        }
       })
      }
     })
    }
   })

   province.children = cityList
   return province;
  })

  return convertedData;
 }

}
//注册时支持到三级
export function getRegAreaData(areaDataPro) {
 let areaData = []
 if(areaDataPro) {
  areaData = areaDataPro
 }else if(localStorage.getItem("area")){
  areaData = localStorage.getItem("area")
 }
 if (areaData.length) {
  let newAreaData = JSON.parse(areaData);
  let convertedData = newAreaData.map(item => {
   let province = {
    value: item.areaId,
    label: item.areaName,
   };
   const cityList = item.childern.map(city => {
    return {
     value: city.areaId,
     label: city.areaName,
     children: city.childern.map(area => {
      return {
       value: area.areaId,
       label: area.areaName,
      }
     })
    }
   })
   province.children = cityList
   return province;
  })
  return convertedData;
 }

}
