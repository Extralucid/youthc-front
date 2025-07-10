export default function CompleteStep() {
    return (
      <div className="flex grow flex-col items-center justify-center py-14 md:p-0">
        <img
          src="../assets/img/icon-thank-you.svg"
          alt="thank-you-icon"
          className="m-5 w-14 md:w-20"
        />
  
        <h1>Merci!</h1>
  
        <p className="mx-3 mt-3 text-pretty text-center md:text-lg md:tracking-wide">
        Merci d'avoir confirmé votre souscription! Nous espérons que vous aurez du plaisir à utiliser notre
        plate-forme. Si jamais vous avez besoin d'aide, n'hésitez pas à nous envoyer un e-mail à
          support@bf.youthc.com.
        </p>
      </div>
    );
  }