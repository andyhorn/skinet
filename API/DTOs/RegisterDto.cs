using System.ComponentModel.DataAnnotations;

namespace API.DTOs
{
    public class RegisterDto
    {
        [Required]
        [EmailAddress]
        public string Email { get; set; }

        [Required]
        public string DisplayName { get; set; }

        [Required]
        [RegularExpression(
          @"(?=^.{6,64}$)(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&amp;*()_+}{&quot;:;'?/&gt;.&lt;,])(?!.*\s).*$",
          ErrorMessage = "Password must have 1 uppercase letter, 1 lowercase letter, 1 number, 1 special character, and at least 6 characters"
        )]
        public string Password { get; set; }
    }
}