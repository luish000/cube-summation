async function postConfirm() {
   const { id: serviceId, driverId } = this.request.body
   let service = await Service.findOne({ id: serviceId })
   if (!service) return this.response.body = { error: 3 }
   switch(service.statusId) {
     case '1': {
       if (!service.driverId) {
         let opts = { available: 0 }
         const driver = await Driver.findOneAndUpdate({ id: driverId }, opts)
         opts = { driverId, cardId: driver.cardId, statusId: 2 }
         service = await Service.findOneAndUpdate({ id: serviceId }, opts)
         await sendPush(service.user.uuid, service.user.type, { serviceId })
         return this.response.body = { error: 0 }
       }
       return this.response.body = { error: 1 }
     }
     case '6': {
       return this.response.body = { error: 2 }
     }
   }
 }

 async function sendPush(uuid, type, data) {
   const push = await Push.make()
   const message = 'Tu servicio ha sido confirmado'
   if (!uuid) return
   if (type == '1') {
     push.ios(uuid, message, 1, 'how.wav', 'open', data)
   } else {
     push.ios(uuid, message, 1, 'default', 'open', data)
   }
}
