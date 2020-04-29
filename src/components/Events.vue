<template>
<div>
    <h1>List des evenements of gdg sousse </h1>

<div class="form-group">
      <input v-model="title" type="text" class="form-control" placeholder="New event ..">
</div>
<!--  -->
<button v-if="myEvent" @click="modifEvent"  class="btn btn-block btn-warning">Edit Event</button>
<button @click="addEvent()" class="btn btn-block btn-success">Add Event</button>


<ul class="list-group">
    
     <li class="list-group-item" v-bind:key="event.id" v-for="event in events">
         
         <Event 
         :event="event" 
         v-on:deleteEvent="deleteOnEvent" 
         v-on:editEvent="editOnEvent" 
         />

      </li>
</ul>
</div>
</template>

<script>
import axios from 'axios';
import Event from './Event';
export default {
name:"Events",
   components : {
          Event 
      },
   data(){
  return {
             title:'',
             myEvent:null,
             events:[]
}
},
methods:{
        modifEvent(){
            
             let event = {
                    ...this.myEvent ,
                    title:this.title
                    
                    }
            axios.put('http://localhost:3000/Events/'+event.id, event)
            .then( res => {
                this.events = this.events.map(ev => {
                    if(res.data.id === ev.id){
                        return res.data 
                    }
                    
                    return ev ;
                })
                this.title ='';
                this.myEvent = null ;
            });
        },
        addEvent(e){
            if (e) {
                e.preventDefault();
            }
            if(this.title !=''){
                    let newEvent = {
                    title:this.title,
                    completed:false
                    }
                axios.post('http://localhost:3000/Events' , newEvent )
                .then(res => {
                    this.events = [res.data , ...this.events];
                    this.title='';
                })
            }
        },
        editOnEvent(event){
            this.myEvent = event ;
            this.title = event.title ;
        },
        getEvents(){
        axios.get('http://localhost:3000/Events' )
            .then(res => this.events = res.data)
            .catch(err => console.log(err))
        },
        deleteOnEvent(id){
            if(confirm('Are you sure to delete this Event ? '))
            {
                axios.delete(`http://localhost:3000/Events/${id}`)
                .then(() => { this.events = this.events.filter(event => event.id !== id );
                })
            }
            
        }


},
created(){
    this.getEvents();
}
}
</script>

<style>

</style>