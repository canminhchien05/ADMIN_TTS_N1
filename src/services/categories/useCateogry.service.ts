import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { axiosInstance } from "../../utils/axios.util";
import { message } from "antd";


export const useGetCategories = () => {
  return useQuery({
    queryKey: ['get_categories'],
    queryFn: async () => {
      const response = await axiosInstance.get(`/categories?includeDeleted=true`);
      return response.data;
    },
  });
};

export const useHandGetCategories = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ['hand_get_categories'],
    mutationFn: async () => {
      queryClient.invalidateQueries({ queryKey: ['get_categories'] });
    }
  })
}

export const useDeleteCategory = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ['hand_delete_category'],
    mutationFn: async (id: string) => {
      const response = await axiosInstance.delete(`/categories/${id}`);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['get_categories'] });
      message.success("Danh mục đã được xóa");
    },
    onError: () => {
      message.error("Lỗi khi xóa danh mục");
    }
  })
}

export const useRestoreCategory = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ['hand_delete_category'],
    mutationFn: async (id: string) => {
      const response = await axiosInstance.patch(`/categories/restore/${id}`);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['get_categories'] });
      message.success("Đã khôi phục");
    },
    onError: () => {
      message.error("Lỗi khi khôi phục");
    }
  })
}

export const useDeleteForceCategory = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ['hand_delete_category'],
    mutationFn: async (id: string) => {
      const response = await axiosInstance.patch(`/categories/restore/${id}`);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['get_categories'] });
      message.success("Đã khôi phục");
    },
    onError: () => {
      message.error("Lỗi khi khôi phục");
    }
  })
}