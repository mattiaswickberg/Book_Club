<template>
<div>
  <b-container fluid>
    <b-row id='announcementHeader'>
      <b-col></b-col>
      <b-col cols='10'>
        <h1>Meddelanden till SSIS bokcirkel</h1>
        </b-col>
      <b-col></b-col>      
    </b-row>
    <b-row id='titlebar'>
      <b-col cols='3'><h4>Aktiva meddelanden</h4></b-col>
      <b-col cols='6'><h4>Nytt meddelande</h4></b-col>
      <b-col cols='3'><h4>Arkiverade meddelanden</h4></b-col>
    </b-row>
        <b-row>
      <b-col>
        <div v-for='announcement in announcements' :key='announcement._id'>
          <h2>{{announcement.title}}</h2>
          <img id ='previewImage' v-bind:src="announcement.image">
          <div id='previewText'>{{announcement.content}}</div>
          <span v-if='announcement.date' id='previewDate'>Meddelandet publicerades: {{announcement.date}} </span> <span id='previewUser' v-if='announcement.user'> av {{announcement.user}}</span>
          <br><b-btn v-on:click='archiveAnnouncement(announcement._id)'>Archive</b-btn>
        </div>
      </b-col>
      <b-col cols='4'>
        <div v-if='newAnnouncement.title' id='preview'>
          <h4>Förhandsgranskning av ditt meddelande</h4>
          <h2>{{newAnnouncement.title}}</h2>
          <img id ='previewImage' v-bind:src="newAnnouncement.image">
          <div id='previewText'>{{newAnnouncement.content}}</div>
          <span v-if='newAnnouncement.date' id='previewDate'>Meddelandet publicerades: {{newAnnouncement.date}} </span> <span id='previewUser' v-if='newAnnouncement.user'> av {{newAnnouncement.user}}</span>
        </div>
        <div>
          <b-form>
            <!-- Title for Announcement -->
            <b-form-group 
            id='titleGroup'
            label='Titel'
            label-for='titleInput'
            description='Skriv titeln för ditt meddelande här'>
            <b-form-input 
            id='titleInput'
            type='text'
            v-model='newAnnouncement.title'
            required
            placeholder='Meddelande från Admin'>
            </b-form-input>
            </b-form-group>
            <!-- Type of Annoucement 
            <b-form-group 
            id='typeGroup'
            label='Type'
            label-for='typeInput'
            description='Vilken typ av meddelande är detta?'>
            <b-form-input 
            id='typeInput'
            type=''
            v-model='newAnnouncement.title'
            required
            placeholder=''>
            </b-form-input>
            </b-form-group>
              -->
            <!-- Image -->
            <b-form-group 
            id='imageGroup'
            label='Bild'
            label-for='imageInput'
            description='Länk till bild'>
            <b-form-input 
            id='imageInput'
            type='text'
            v-model='newAnnouncement.image'
            placeholder='https://bildsida/bild.png'>
            </b-form-input>
            </b-form-group>
            <!-- Content -->
            <b-form-group 
            id='contentGroup'
            label='Innehåll'
            label-for='contentInput'
            description='Meddelandetext'>
            <b-form-textarea 
            id='contentInput'
            type='textarea'
            :rows='6'
            v-model='newAnnouncement.content'
            required
            placeholder="Don't forget your towel on Towel day!">
            </b-form-textarea>
            </b-form-group>
            <!-- Date -->
            <b-form-group 
            id='dateGroup'
            label='Datum'
            label-for='dateInput'
            description='Det datum när meddelandet ska visas'>
            <b-form-input 
            id='dateInput'
            type='date'
            v-model='newAnnouncement.date'
            placeholder=''>
            </b-form-input>
            </b-form-group>
            <!-- User -->
            <b-form-group 
            id='userGroup'
            label='Användare'
            label-for='userInput'
            description='Från vem är meddelandet?'>
            <b-form-input 
            id='userInput'
            type='text'
            v-model='newAnnouncement.user'
            placeholder='Admin'>
            </b-form-input>
            </b-form-group>
            <b-btn variant='success' v-on:click='saveAnnouncement'>Spara meddelande</b-btn>
          </b-form>
        </div>
      </b-col>
      <b-col>
        <div v-for='announcement in archived' :key='announcement._id'>
          <h2>{{announcement.title}}</h2>
          <img id ='previewImage' v-bind:src="announcement.image">
          <div id='previewText'>{{announcement.content}}</div>
          <span v-if='announcement.date' id='previewDate'>Meddelandet publicerades: {{announcement.date}} </span> <span id='previewUser' v-if='announcement.user'> av {{announcement.user}}</span>
        </div>
      </b-col>
    </b-row>
  </b-container>
</div>
  
</template>

<script>
import {HTTP} from '@/services/Api'
import router from '@/router/index'
export default {
  data() {
    return {
      newAnnouncement: {
      type: '',
      title: '',
      image: '',
      content: '',
      dateAdded: '',
      user: ''
      },      
      announcements: [],
      archived: []
    }
  },
  beforeCreate: function () {
    let user = this.$session.get('user')
    if (user.role !== 'admin') {
      router.push('/')
    }
  },
  created () {
    HTTP.get('/announcements').then(response => {
      console.log(response.data)
      if(response.data.length !== 0) {
        response.data.forEach(element => {
          if(element.archived === true) {
            this.archived.push(element)
          } else {
            this.announcements.push(element)
          }
        });
        
      } else {
        this.announcements.push({
          title: 'No announcements yet'
        })
      }
    })
  },
  methods: {
      saveAnnouncement: function () {
        console.log(this.newAnnouncement)
        HTTP.post('/announcement', this.newAnnouncement)
        .then(response => {
          console.log(response)
        })
        .catch(err => console.log(err))
      },
      archiveAnnouncement: function (id) {
        console.log('Archiving announcement')
        HTTP.post('/archiveannouncement', {id: id}).then(response => {
          console.log(response)
          this.announcements.forEach(element => {
            if(element._id === id) {
              element.archived = true
            }
          });
        })
      }
    }
  }
</script>

<style lang="scss" scoped>

#titlebar {
  background-color: lightgray;
}
#preview {
  border: 1px solid whitesmoke;
  padding: 10px;
  margin: 10px;
}

#announcementHeader {
  padding: 10px;
  margin: 10px;
}

#previewImage {
  width: 50%;
  margin-top: 10px;
  margin-bottom: 20px;
}

</style>
