import $axios from 'axios'

export const getTest=function (params) {
        return $axios.post('/api/test',params)
}