import instanceAxios from './base';

class ContainerApi {
  static async getContainers(status) {
    const response = await instanceAxios.post('/get-all-containers', { status });
    return response.data;
  }

  static async createContainer(containerData) {
    const response = await instanceAxios.post(
      '/add-new-container',
      containerData
    );
    return response.data;
  }

  static async editContainer(containerData) {
    const response = await instanceAxios.post(
      '/update-container-by-id',
      containerData,
      { params: containerData.id }
    );
    return response.data;
  }

  static async removeContainer(containerId) {
    const response = await instanceAxios.post(
      '/delete-container-by-id',
      { id: containerId }
    );
    return response.data;
  }

  static async getStatistic(containerId) {
    const response = await instanceAxios.post(
      '/get-statistic',
      { params: containerId }
    );
    return response.data;
  }
}

export default ContainerApi;
