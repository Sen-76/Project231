using LearnWebAPI.Models;
using System.Security.Claims;
using System.Security.Principal;

namespace BackEnd.Ultity
{
    public static class GetCurrentUser
    {
        public static User CurrentUser(IIdentity identity)
        {
            if (identity != null && identity.IsAuthenticated && identity is ClaimsIdentity claimsIdentity)
            {
                var userClaims = claimsIdentity.Claims;

                return new User
                {
                    Username = userClaims.FirstOrDefault(o => o.Type == ClaimTypes.Name)?.Value,
                    Role = Enum.Parse<RoleType>(userClaims.FirstOrDefault(o => o.Type == ClaimTypes.Role)?.Value),
                    Id = Guid.Parse(userClaims.FirstOrDefault(o => o.Type == ClaimTypes.NameIdentifier)?.Value),
                };
            }
            return null;
        }
    }
}
