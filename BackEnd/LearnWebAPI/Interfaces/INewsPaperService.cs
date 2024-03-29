﻿using BackEnd.Models;
using BackEnd.Paging;
using BackEnd.ViewModels.NewFolder;
using LearnWebAPI.Models;

namespace BackEnd.Interfaces
{
    public interface INewsPaperService
    {
        Task<PaginatedList<NewsPaper>> GetListNewsPaper(int? pageIndex);
        Task<ApiResponse> AddNewsPaper(NewsPaperAddVM newsPaper);
        Task<ApiResponse> UpdateNewsPaper(NewsPaperUpdateVM newsPaper);
        Task<ApiResponse> DeleteNewsPaper(Guid id);
        Task<ApiResponse> PublishNewsPaper(Guid id);
        Task<ApiResponse> GetNewsPaperByCate(string cate);
        Task<List<NewsPaper>> FetchNewsPaper(int? pageIndex, string? search);
        Task<ApiResponse> RestoreNewsPaper(Guid id);
        Task<ApiResponse> GetNewsPaperById(string id);
    }
}
