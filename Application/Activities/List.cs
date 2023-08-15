using System.Linq;
using Application.Core;
using Application.Interfaces;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Activities
{
    public class List
    {
        public class Query : IRequest<Result<PagedList<ActivityDto>>>
        {
            public ActivityParams Params { get; set; }
        }

        public class Handler : IRequestHandler<Query, Result<PagedList<ActivityDto>>>
        {
            /*private readonly DataContext _context;
            private readonly ILogger<List> _logger;
            
            public Handler(DataContext context, ILogger<List> logger) 
            {
                _logger = logger;
                _context = context;
            }*/
            private readonly IMapper _mapper;
            private readonly IUserAccessor _userAccessor;
            private readonly DataContext _context;

            public Handler(DataContext context, IMapper mapper, IUserAccessor userAccessor) 
            {
                _mapper = mapper;
                _userAccessor = userAccessor;
                _context = context;
            }

            public async Task<Result<PagedList<ActivityDto>>> Handle(Query request, CancellationToken cancellationToken)
            {
                /*try
                {
                    for(var i = 0; i < 10; i++)
                    {
                        cancellationToken.ThrowIfCancellationRequested();
                        await Task.Delay(1000, cancellationToken);
                        _logger.LogInformation($"Task {i} has completed.");
                    }
                }
                catch (System.Exception)
                {
                    _logger.LogError($"Task has cancelled.");
                }*/
                var query = _context.Activities
                    .Where(d => d.Date >= request.Params.StartDate)
                    .OrderByDescending(d => d.Date)
                    .ProjectTo<ActivityDto>(_mapper.ConfigurationProvider, 
                        new {currentUsername = _userAccessor.GetUserName()})
                    .AsQueryable();

                if(request.Params.IsGoing && !request.Params.IsHost)
                    query = query.Where(x => x.Attendees.Any(a => a.Username == _userAccessor.GetUserName()));

                if(request.Params.IsHost && !request.Params.IsGoing)
                    query = query.Where(x => x.HostUserName == _userAccessor.GetUserName());

                return Result<PagedList<ActivityDto>>.Success(
                    await PagedList<ActivityDto>.CreateAsync(
                        query, 
                        request.Params.PageNumber, 
                        request.Params.PageSize)
                );
            }
        }
    }
}