
/**
 * Instancia de VueJs
 */
new Vue({
  el: '#tasking',
  data: {
    tasks: [],
    tasks1: [],
    titulos: ["DESCRIPCION", "FECHA", "PRIORIDAD", "CUMPLIDA", ""],
    task: [{
      validaciones: [],
      descripcion: null,
      fecha: null,
      prioridad: 'ALTA',
    }],
    options: [
      { text: 'PRIORIDAD ALTA', value: 'ALTA' },
      { text: 'PRIORIDAD MEDIA', value: 'MEDIA' },
      { text: 'PRIORIDAD BAJA', value: 'BAJA' }
    ],
    validaciones: []
  },
  created: function () {
    this.getTasksCheked();
    this.getTasksUnCheked();
  },
  methods: {
    getTasksCheked: function () {
      axios.get("http://localhost:3000/tasks/false")
        .then(response => {
          this.tasks = response.data
        }).catch(error => {
          console.log(error)
        })
    },
    getTasksUnCheked: function () {
      axios.get("http://localhost:3000/tasks/true")
        .then(response => {
          this.tasks1 = response.data
        }).catch(error => {
          console.log(error)
        })
    },
    checkedTask: function (id) {
      axios.put("http://localhost:3000/tasks/" + id)
        .then(response => {

          this.getTasksCheked();
          this.getTasksUnCheked();
          console.log(response)
        }).catch(error => {
          console.log(error)
        })
    },
    deleteTask: function (id) {
      axios.delete('http://localhost:3000/tasks/' + id).then(response => {

        this.getTasksCheked();
        this.getTasksUnCheked();
        console.log(response)
      }).catch(error => {
        console.log(error)
      });
    },
    addTask: function () {
      if (this.checkForm() == true) {

        axios.post('http://localhost:3000/tasks', {
          descripcion: this.task.descripcion,
          fecha: this.task.fecha,
          prioridad: this.task.prioridad
        })
          .then(res => {
            console.log("Agregado")
            console.log(res)

            this.getTasksCheked();
            this.getTasksUnCheked();
          }).catch(res => {
            console.log(res)
          });
      }

    },
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
  },
  computed: {
    searchUser: function () {
      return this.tasks.filter(item.lista);
    }
  }
});

