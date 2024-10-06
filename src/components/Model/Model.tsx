interface ModelProps {
  header: string;
  image: string;
}

const Model = ({ header, image }: ModelProps) => {
  return (
    <div className="flex flex-col p-4">
      <h1 className="text-2xl font-bold mb-4">{ header }</h1>
      <div className="w-full flex justify-center py-5">
        <img 
          className='w-2/3 px-10'
          src={image} 
          alt='static model static-model' 
        />
      </div>
    </div>
  )
};

export default Model;