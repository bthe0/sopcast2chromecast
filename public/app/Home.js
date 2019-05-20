Vue.component('home', {
    mounted: function() {
        this.loading = true;
        axios.get('api/channels').then((res) => {
           const data = res.data;

           this.channels = data.channels;
           this.loading = false;
        });
    },
    data: function () {
        return {
            loading: false,
            channels: []
        }
    },
    methods: {
        play: function(id) {
            axios.post('api/change', {
                id: id
            }).then(res => {
                console.log(res.data);
            });
        }
    },
    template: `
        <div class="container">
            <div class="row">
                <template v-if="loading">
                    Loading...
                </template>
                <template v-else>
                    <div class="col-lg-12">
                        <h2 class="mt-3">All channels</h2>
                    </div>
                    <div v-for="(chan, index) in channels" class="col-lg-3">
                        <h1>{{chan.name}}</h1>
                        <button class="btn btn-success" @click="play(index)">Play</button>
                    </div>
                </template>
            </div>
        </div>
    `
});