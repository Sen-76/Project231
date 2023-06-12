using System.Reflection;

namespace BackEnd.Ultity
{
    public class Ultity
    {
        //public static string ToAttributeString(this Enum enumItem)
        //{
        //    var type = enumItem.GetType();
        //    var field = type.GetField(enumItem.ToString());
        //    if (field != null)
        //    {
        //        var attributes = field.GetCustomAttributes<EnumValueAttribute>();
        //        if (attributes != null)
        //        {
        //            var attribute = attributes.FirstOrDefault();
        //            if (attribute != null)
        //            {
        //                return attribute.Value;
        //            }
        //        }
        //    }
        //    return string.Empty;
        //}

        public static T ConvertToEnum<T>(int value) where T : Enum
        {
            var type = typeof(T);
            foreach (var item in Enum.GetValues(type))
            {
                var field = item.GetType().GetField(item!.ToString());
                var attributes = field.GetCustomAttributes<EnumAttribute>();
                if (attributes != null)
                {
                    var attribute = attributes.FirstOrDefault();
                    if (attribute != null)
                    {
                        if (attribute.value == value)
                        {
                            return (T)item;
                        }
                    }
                }
            }
            return default;
        }
    }
}
