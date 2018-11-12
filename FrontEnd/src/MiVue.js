
/**
 * Instancia de VueJs
 * 
 */
new Vue({
  el: '#tasking',
  data: {
    //ARRAY DE TAREAS SIN CUMPLIR
    tasks: [],
    //ARRAY DE TAREAS CUMPLIDAS 
    tasks1: [],
    //TITULOS DE LAS TABLAS PARA MOSTRAR LAS TAREAS
    titulos: ["DESCRIPCION", "FECHA", "PRIORIDAD", "CUMPLIDA", ""],
    //OBJETO DE UNA TAREA 
    task: [{
      descripcion: null,
      fecha: null,
    }],
    //APCION POR DEFAULT DE PRIORIDAD DE TAREAS
    option: 'ALTA',
    //OPCIONES DEL SELECT DE LA PRIORIDAD
    options: [
      { text: 'PRIORIDAD ALTA', value: 'ALTA' },
      { text: 'PRIORIDAD MEDIA', value: 'MEDIA' },
      { text: 'PRIORIDAD BAJA', value: 'BAJA' }
    ],
    //ARRAY DE VALIDACIONES PARA LA AGREGACION DE TAREAS
    validaciones: []
  },
  //METODO QUE SE CARGARA AL CREARSE LA PAGINA
  created: function () {
    this.getTasksCheked();
    this.getTasksUnCheked();
  },
  methods: {
    /**
     * METODO PARA LA OBTENCICON DE TAREAS QUE NO SE AN CUMPLIDO 
     */
    getTasksCheked: function () {
      axios.get("http://localhost:3000/tasks/false")
        .then(response => {
          this.tasks = response.data
        }).catch(error => {
          console.log(error)
        })
    },
    /**
     * METODO PARA LA OBTENCION DE TAREAS YA CUMPLIDAS 
     */
    getTasksUnCheked: function () {
      axios.get("http://localhost:3000/tasks/true")
        .then(response => {
          this.tasks1 = response.data
        }).catch(error => {
          console.log(error)
        })
    },
    /**
     * METODO PARA MARCAR UNA TAREA COMO CUMPLIDA O NO CUMPLIDA
     * @param {id de la tarea a ser marcada como cumplida} id 
     */
    checkedTask: function (id) {
      axios.put("http://localhost:3000/tasks/" + id)
        .then(response => {
          this.getTasksCheked();
          this.getTasksUnCheked();
        }).catch(error => {
          console.log(error)
        })
    },
    /**
     * METODO PARA LA ELIMINACION DE TAREAS
     * @param {ID DE LA TAREA A SER ELIMANDA } id 
     */
    deleteTask: function (id) {
      axios.delete('http://localhost:3000/tasks/' + id).then(response => {
        this.getTasksCheked();
        this.getTasksUnCheked();
      }).catch(error => {
        console.log(error)
      });
    },
    /**
     * METODO PARA AGREGAR UNA NUEVA TAREA Y HACER LA VALIDACION DE CAMPOS 
     */
    addTask: function () {
      if (this.checkForm() == true) {

        axios.post('http://localhost:3000/tasks', {
          descripcion: this.task.descripcion,
          fecha: this.task.fecha,
          prioridad: this.option
        })
          .then(res => {
            this.task.descripcion= null
            this.task.fecha =null            
            this.getTasksCheked();
            this.getTasksUnCheked();
          }).catch(res => {
            console.log(res)
          });
      }

    },
    /**
     * METODO PARA VALIDACION DE CAMPOS EN EL FORMULARIO PARA LA AGREGACION DE NUEVA TAREA
     * @param {ERROR} e 
     */
    checkForm: function (e) {
      this.validaciones = [];

      if (!this.task.descripcion) {
        this.validaciones.push('POR FAVOR INGRESE LA DESCRIPCION');
      }
      if (!this.task.fecha) {
        this.validaciones.push('POR FAVOR INGRESE LA FECHA');
      }
      if (!this.validaciones.length) {
        return true;
      }
    }
  }
});

