import request from '@/utils/request'

export const getAritcalChannel = () => {
  return request.get('/my/cate/list')
}

export const addArticalService = ({ cate_name, cate_alias }) => {
  return request.post('/my/cate/add', {
    cate_name,
    cate_alias
  })
}

export const updateArticleService = ({ id, cate_name, cate_alias }) => {
  return request.put('/my/cate/info', { id, cate_name, cate_alias })
}

export const deleteArticleService = (id) => {
  return request.delete('/my/cate/del', {
    params: { id }
  })
}

export const getArticleList = (params) => {
  return request.get('/my/article/list', {
    params
  })
}

export const addArtical = (data) => request.post('/my/article/add', data)

export const getArticle = (id) => {
  return request.get('/my/article/info', {
    params: { id }
  })
}

export const updateArtical = (params) => {
  return request.put('/my/article/info', params)
}

export const delArtical = (id) => {
  return request.delete('/my/article/info', {
    params: { id }
  })
}
