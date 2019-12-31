let app = new Vue({
    el: '#app',
    data: () => ({
      message: 'Hello Vue!',
      businessName: '',
      page: 1,
      loading: false
    }),
    methods: {

        searchBusiness(){
            if (this.loading){
                return
            }
            this.page = 1
            this.load()  
        },

        async load(){
            this.loading = true
            let version = 7

            let name = this.businessName

            let response = await axios.post(`http://play.hpccsystems.com:8002/WsEcl/json/query/roxie/_f1_fetchbusinessjss.${version}?ver_=0`, {
                ["_f1_fetchbusinessjss." + version]: { name, page: this.page }
            })
        
            let columns = [
                { name: 'Name', value: 'business_name', width: 50 },
                { name: 'City', value: 'city', width: 20 },
                { name: 'State', value: 'state' },
                { name: 'Stars', value: 'stars' },
            ]

            table(response.data[`_f1_fetchbusinessjss.${version}Response`].Results.result_1.Row, columns, 'business-table-container')

            this.loading = false
        },

        next(){
            this.page++

            this.load()
        },

        previous(){
            this.page = Math.max(1, this.page - 1)

            this.load()
        }

    }
})
