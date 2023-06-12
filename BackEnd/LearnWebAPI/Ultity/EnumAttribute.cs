namespace BackEnd.Ultity
{
    public class EnumAttribute : Attribute
    {
        public int value { set; get; }

        public EnumAttribute(int value)
        {
            this.value = value;
        }
    }
}
