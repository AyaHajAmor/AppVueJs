<template>
  <div>
      <h3 :class="{
          'is-completed': event.completed
      }">{{ event.title }}</h3>
       <div class="text-right">
           
            <BUTTon @click="deleteEvent"  class="btn btn-danger btn-sm mr-1">supprimer</BUTTon>
        <BUTTon @click="editEvent" class="btn btn-info btn-sm mr-1">modifier</BUTTon>
       </div>
    </div>
</template>

<script>
export default {
props: ['event'],
methods :{
    deleteEvent(){
        this.$emit('deleteEvent',this.event.id);
    },
    editEvent(){
        this.$emit('editEvent',this.event);
        
    }
}
}
</script>

<style>
.is-completed{
    text-decoration: line-through;
} 
</style>